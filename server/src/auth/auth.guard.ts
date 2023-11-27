import { IConfiguration } from "@/configuration/configuration.types";
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const access = this.validateRequest(request);
    const accessSecret = this.configService.get<IConfiguration>("app").accessSecret;

    try {
      const user = await this.jwtService.verifyAsync(access, { secret: accessSecret });
      request["user"] = user;
    } catch {
      throw new UnauthorizedException("Access токен мёрт, либо не валиден");
    }

    return true;
  }

  // Private Method
  private validateRequest(request: Request): string {
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new BadRequestException("Не передан authorization заголовок");
    }

    const [type, access] = authorization.split(" ");

    if (type !== "Bearer" || !access) {
      throw new BadRequestException("Невалидный authorization заголовок");
    }

    return access;
  }
}
