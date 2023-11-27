import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "@/users/users.module";
import { SessionsModule } from "@/sessions/sessions.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({}), UsersModule, SessionsModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
