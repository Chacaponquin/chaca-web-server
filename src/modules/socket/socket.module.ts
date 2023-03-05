import { Module } from "@nestjs/common";
import { SocketGateway } from "./controller/socket.gateway";
import { DatasetGeneratorModule } from "./modules/dataset_generator/dataset_generator.module";
import { FileGeneratorModule } from "./modules/file_generator/file_generator.module";
import { SocketService } from "./services/socket.service";

@Module({
  imports: [DatasetGeneratorModule, FileGeneratorModule],
  exports: [],
  providers: [SocketGateway, SocketService],
  controllers: [],
})
export class SocketModule {}
