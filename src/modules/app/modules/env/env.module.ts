import { Module } from "@nestjs/common";
import { EnvService } from "./services/env.service";
import { ConfigModule } from "@nestjs/config";

const filterEnv = () => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === "test") {
    return ".env.test";
  } else if (NODE_ENV === "development") {
    return ".env.dev";
  } else {
    return ".env";
  }
};

const envFile = filterEnv();

@Module({
  controllers: [],
  exports: [EnvService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFile,
      expandVariables: true,
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
})
export class EnvModule {}
