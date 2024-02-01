import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "../constants/SOCKET_EVENTS";
import { CreateDatasetDTO } from "../dto/dataset";
import { DatasetCreationError } from "@modules/dataset/exceptions/dataset";
import { DATASETS_ERROR_HTTP_STATUS } from "@modules/dataset/constants/DATASETS_ERROR_HTTP_STATUS";
import { CreateAndExportDatasets } from "../use-cases";
import { DatasetService } from "@modules/dataset/services/dataset.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class DatasetSocketGateway {
  constructor(private readonly datasetServices: DatasetService) {}

  @WebSocketServer()
  public server: Server;

  @SubscribeMessage(SOCKET_EVENTS.CREATE_DATASETS)
  public async createDatasets(
    @MessageBody() body: CreateDatasetDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const useCase = new CreateAndExportDatasets(this.datasetServices);

      const fileName = await useCase.execute({
        datasetsConfig: body.datasets,
        fileConfig: body.config,
      });

      socket.emit(SOCKET_EVENTS.GET_FILE_URL, fileName);
    } catch (error) {
      if (error instanceof DatasetCreationError) {
        socket.emit(SOCKET_EVENTS.CREATION_ERROR, {
          content: error.content,
          code: error.code,
        });
      } else {
        socket.emit(SOCKET_EVENTS.CREATION_ERROR, {
          content: "Error in datasets creation",
          code: DATASETS_ERROR_HTTP_STATUS.DEFAULT,
        });
      }
    }
  }
}
