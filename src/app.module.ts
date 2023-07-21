import { Module } from "@nestjs/common";
import { UtilsModule } from "./modules/utils/utils.module";
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
import { SocketModule } from "./modules/socket/socket.module";
import { DatasetModule } from "@modules/dataset/dataset.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.development",
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string, {}),
    UtilsModule,
    ApiModule,
    AuthModule,
    DocsModule,
    UserMessageModule,
    AuthModule,
    DatasetModelModule,
    UserModule,
    SchemaOptionsModule,
    AdminModule,
    SocketModule,
    DatasetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
