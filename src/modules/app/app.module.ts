import { Module } from "@nestjs/common";
import { WebApiModule } from "../web-api/web-api.module";
import { ApiModule } from "../api/api.module";
import { UserModule } from "../user/user.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { DocsModule } from "../docs/docs.module";
import { DatasetModelModule } from "../dataset-model/dataset-model.module";
import { UserMessageModule } from "../user-message/user-message.module";
import { SchemaOptionsModule } from "../schema-options/schema-options.module";
import { AdminModule } from "../admin/admin.module";
import { DatasetSocketModule } from "../dataset-socket/dataset-socket.module";
import { DatasetModule } from "@modules/dataset/dataset.module";
import { LanguageModule } from "./modules/language/language.module";

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: NODE_ENV === "test" ? ".env.test" : ".env",
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string, {}),
    WebApiModule,
    ApiModule,
    AuthModule,
    DocsModule,
    UserMessageModule,
    AuthModule,
    DatasetModelModule,
    UserModule,
    SchemaOptionsModule,
    AdminModule,
    DatasetSocketModule,
    DatasetModule,
    LanguageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
