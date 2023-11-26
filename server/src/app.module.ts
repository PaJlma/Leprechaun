import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConfiguration } from "./configuration/configuration";
import { MongooseModule } from "@nestjs/mongoose";
import { IConfiguration } from "./configuration/configuration.types";

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
