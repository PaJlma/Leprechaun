import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConfiguration } from "./configuration/configuration";
import { MongooseModule } from "@nestjs/mongoose";
import { IConfiguration } from "./configuration/configuration.types";
import { UsersModule } from "./users/users.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [getConfiguration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<IConfiguration>("app").mongoUri,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "..", "static"),
    }),
    UsersModule,
    AuthModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
