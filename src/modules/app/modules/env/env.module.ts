import { Module } from "@nestjs/common";
import { EnvService } from "./services/env.service";
import { ConfigModule } from "@nestjs/config";

const NODE_ENV = process.env.NODE_ENV;

@Module({
  controllers: [],
  exports: [EnvService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: NODE_ENV === "test" ? ".env.test" : ".env",
      expandVariables: true,
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
})
export class EnvModule {}
