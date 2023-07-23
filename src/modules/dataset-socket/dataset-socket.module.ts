import { Module } from "@nestjs/common";
import { DatasetSocketGateway } from "./controller/dataset-socket.gateway";
import { SocketService } from "./services/dataset-socket.service";
import { DatasetModule } from "@modules/dataset/dataset.module";

@Module({
  imports: [DatasetModule],
  exports: [],
  providers: [DatasetSocketGateway, SocketService],
  controllers: [],
})
export class DatasetSocketModule {}
