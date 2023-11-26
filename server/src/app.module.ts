import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getConfiguration } from "./configuration/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [getConfiguration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
