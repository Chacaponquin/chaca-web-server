import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SocketAdapter } from "@shared/adapters/SocketAdapter";
import { ChacaExceptionFilter } from "@shared/filters/http-error.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ChacaExceptionFilter());
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.enableCors();
  await app.listen(process.env.PORT || 8000);
}

bootstrap();
