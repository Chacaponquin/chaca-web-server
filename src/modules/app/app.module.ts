import { Module } from "@nestjs/common";
import { WebApiModule } from "../web-api/web-api.module";
import { ApiModule } from "../api/api.module";
import { UserModule } from "../user/user.module";
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
import { EnvModule } from "./modules/env/env.module";
import { ThrottlerModule } from "@nestjs/throttler";

function load() {
  console.log(process.env.MONGO_URI);
  return MongooseModule.forRoot(process.env.MONGO_URI as string, {});
}

@Module({
  imports: [
    EnvModule,
    load(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
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
