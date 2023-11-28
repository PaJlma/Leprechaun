import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { IConfiguration } from "./configuration/configuration.types";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Forest API")
    .setContact("PaJlma", "https://github.com/PaJlma", "palma21042005@gmail.com")
    .setDescription('Есть вопросы - <a href="https://t.me/PaJlma">Мой Телеграм</a>')
    .setVersion("1.0.0")
    .setLicense("Unlicensed", "")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, swaggerDocument);
  //

  const configService = app.get(ConfigService);

  const port = configService.get<IConfiguration>("app").port;
  await app.listen(port);

  console.log(`Server is running on port ${port}`);
}
bootstrap();
