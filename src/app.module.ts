import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UtilsModule } from "./modules/utils/utils.module";
import { ApiModule } from "./modules/api/api.module";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { DocsModule } from "./modules/docs/docs.module";
import { DatasetModelModule } from "./modules/dataset-model/dataset-model.module";
import { UserMessageModule } from "./modules/user-message/user-message.module";
import { SocketGateway } from "@modules/socket/socket.gateway";
import { SchemaOptionsModule } from "./modules/schema-options/schema-options.module";
import { SocketService } from "@modules/socket/services/socket.service";
import { AdminModule } from "./modules/admin/admin.module";

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
    AdminModule,
    AuthModule,
    DatasetModelModule,
    UserModule,
    SchemaOptionsModule,
  ],
  controllers: [AppController],
  providers: [SocketGateway, SocketService],
})
export class AppModule {}
