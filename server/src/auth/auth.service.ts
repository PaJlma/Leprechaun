import { SessionsService } from "@/sessions/sessions.service";
import { CreateUserDto } from "@/users/dtos/createUser.dto";
import { UsersService } from "@/users/users.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ITokens } from "./types/tokens.interface";
import { User } from "@/users/schemas/user.schema";
import { IConfiguration } from "@/configuration/configuration.types";
import * as bcrypt from "bcryptjs";
import { LoginUserDto } from "@/users/dtos/loginUser.dto";
import { DeleteSessionDto } from "@/sessions/dtos/deleteSession.dto";
import { RefreshSessionDto } from "@/sessions/dtos/refreshSession.dto";
import { DeleteUserDto } from "@/users/dtos/deleteUser.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: CreateUserDto, fingerPrint: string): Promise<ITokens> {
    const user = await this.usersService.create(dto);
    const tokens = await this.generateTokens(user, fingerPrint);

    await this.sessionsService.create({
      user: user["_id"],
      fingerPrint,
      access: tokens.access,
      refresh: tokens.refresh,
    });

    return tokens;
  }

  async login(dto: LoginUserDto, fingerPrint: string): Promise<ITokens> {
    const user = await this.validateUser(dto.email, dto.password);
    const tokens = await this.generateTokens(user, fingerPrint);

    await this.sessionsService.updateOrCreateIfNotExists({
      user: user["_id"],
      fingerPrint,
      access: tokens.access,
      refresh: tokens.refresh,
    });

    return tokens;
  }

  async refresh(dto: RefreshSessionDto): Promise<ITokens> {
    const user = await this.usersService.getById(dto.user);

    if (!user) {
      throw new BadRequestException("Пользователь с таким ID не сушествует");
    }

    if (!(await this.sessionsService.getByRefreshToken(dto.user, dto.fingerPrint, dto.oldRefreshToken))) {
      throw new BadRequestException("Refresh токен не является действительным для данного пользователя");
    }

    const tokens = await this.generateTokens(user["_id"], dto.fingerPrint);

    await this.sessionsService.updateOrCreateIfNotExists({
      user: user["_id"],
      fingerPrint: dto.fingerPrint,
      access: tokens.access,
      refresh: tokens.refresh,
    });

    return tokens;
  }

  async logout(dto: DeleteSessionDto): Promise<void> {
    await this.sessionsService.delete(dto);
  }

  async deleteAccount(dto: DeleteUserDto): Promise<void> {
    const user = await this.validateUser(dto.email, dto.password);
    await this.usersService.delete(user["_id"]);
    await this.sessionsService.deleteAllForUser(user["_id"]);
  }

  // Private Methods
  private async generateTokens(user: User, fingerPrint: string): Promise<ITokens> {
    const { __v, password, ...accessPayload } = user["_doc"];
    const refreshPayload = {
      _id: accessPayload._id,
      fingerPrint,
    };

    const { accessSecret, refreshSecret } = this.configService.get<IConfiguration>("app");

    const access = await this.jwtService.signAsync(accessPayload, { secret: accessSecret, expiresIn: "1m" });
    const refresh = await this.jwtService.signAsync(refreshPayload, { secret: refreshSecret, expiresIn: "30d" });

    return { access, refresh };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new BadRequestException("Пользователя с таким Email не существует", { cause: "email" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException("Неправильный пароль", { cause: "password" });
    }

    return user;
  }
}
