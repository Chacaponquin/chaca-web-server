import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ChacaExceptionFilter } from "@shared/filters/http-error.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ChacaExceptionFilter());
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
