import { Module } from "@nestjs/common";
import { WebApiModule } from "./modules/web-api/web-api.module";
import { ApiModule } from "./modules/api/api.module";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { DocsModule } from "./modules/docs/docs.module";
import { DatasetModelModule } from "./modules/dataset-model/dataset-model.module";
import { UserMessageModule } from "./modules/user-message/user-message.module";
import { SchemaOptionsModule } from "./modules/schema-options/schema-options.module";
import { AdminModule } from "./modules/admin/admin.module";
import { DatasetSocketModule } from "./modules/dataset-socket/dataset-socket.module";
import { DatasetModule } from "@modules/dataset/dataset.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
