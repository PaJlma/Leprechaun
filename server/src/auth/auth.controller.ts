import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { CreateUserDto } from "@/users/dtos/createUser.dto";
import { DeleteUserDto } from "@/users/dtos/deleteUser.dto";
import { LoginUserDto } from "@/users/dtos/loginUser.dto";
import { Request, Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Операции с аутентификацией")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Регистрация" })
  @ApiResponse({
    type: String,
    status: HttpStatus.CREATED,
  })
  @Post("registration")
  async registration(
    @Body() dto: CreateUserDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const fingerPrint = request.headers["user-agent"];
    const { access, refresh } = await this.authService.register(dto, fingerPrint);
    response.cookie("refreh", refresh, { httpOnly: true });
    return access;
  }

  @ApiOperation({ summary: "Авторизация" })
  @ApiResponse({
    type: String,
    status: HttpStatus.CREATED,
  })
  @Post("login")
  async login(
    @Body() dto: LoginUserDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const fingerPrint = request.headers["user-agent"];
    const { access, refresh } = await this.authService.login(dto, fingerPrint);
    response.cookie("refresh", refresh, { httpOnly: true });
    return access;
  }

  @ApiOperation({ summary: "Обновление refresh токена" })
  @ApiResponse({
    type: String,
    status: HttpStatus.OK,
  })
  @Patch("refresh/:user")
  async refresh(
    @Param("user") user: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const fingerPrint = request.headers["user-agent"];
    const oldRefreshToken = request.cookies.refresh;

    if (!oldRefreshToken) {
      throw new BadRequestException("Не передан refresh cookie");
    }

    const { access, refresh } = await this.authService.refresh({ user, fingerPrint, oldRefreshToken });
    response.cookie("refresh", refresh, { httpOnly: true });
    return access;
  }

  @ApiOperation({ summary: "Выход из аккаунта" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete("logout/:user")
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Param("user") user: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const fingerPrint = request.headers["user-agent"];
    await this.authService.logout({ user, fingerPrint });
    response.cookie("refresh", "", { httpOnly: true });
  }

  @ApiOperation({ summary: "Удаление аккаунта" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Delete("delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Body() dto: DeleteUserDto, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this.authService.deleteAccount(dto);
    response.cookie("refresh", "", { httpOnly: true });
  }
}
