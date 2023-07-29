import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { SOCKET_EVENTS } from "../constants/SOCKET_EVENTS";
import { SocketService } from "../services/dataset-socket.service";
import { CreateDatasetDTO } from "../dto/dataset";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class DatasetSocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer()
  public server: Server;

  @SubscribeMessage(SOCKET_EVENTS.CREATE_DATASETS)
  public async createDatasets(
    @MessageBody() body: CreateDatasetDTO,
    @ConnectedSocket() socket: any,
  ) {
    try {
      const fileURL = await this.socketService.createDatasets(
        body.datasets,
        body.config,
      );

      socket.emit(SOCKET_EVENTS.GET_FILE_URL, fileURL);
    } catch (error) {
      socket.emit(SOCKET_EVENTS.CREATION_ERROR, error.message);
    }
  }
}
