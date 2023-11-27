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

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Delete("delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Body() dto: DeleteUserDto, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this.authService.deleteAccount(dto);
    response.cookie("refresh", "", { httpOnly: true });
  }
}
