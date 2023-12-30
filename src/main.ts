import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SocketAdapter } from "@modules/app/adapters/SocketAdapter";
import { ChacaExceptionFilter } from "@modules/app/filters/http-error.filter";
import { AppModule } from "./modules/app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ChacaExceptionFilter());
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.enableCors({ origin: "*" });
  await app.listen((process.env.PORT as string) || "8000");
}

bootstrap();
