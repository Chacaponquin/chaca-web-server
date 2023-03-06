import { DatasetModelModule } from "@modules/dataset-model/dataset-model.module";
import { UserModule } from "@modules/user/user.module";
import { Module } from "@nestjs/common";
import { SocketGateway } from "./controller/socket.gateway";
import { DatasetGeneratorModule } from "./modules/dataset_generator/dataset_generator.module";
import { FileGeneratorModule } from "./modules/file_generator/file_generator.module";
import { SocketService } from "./services/socket.service";

@Module({
  imports: [
    DatasetGeneratorModule,
    FileGeneratorModule,
    UserModule,
    DatasetModelModule,
  ],
  exports: [],
  providers: [SocketGateway, SocketService],
  controllers: [],
})
export class SocketModule {}
