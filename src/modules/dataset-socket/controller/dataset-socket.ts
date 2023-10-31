import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
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
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const fileName = await this.socketService.createDatasets(
        body.datasets,
        body.config,
      );

      socket.emit(SOCKET_EVENTS.GET_FILE_URL, fileName);
    } catch (error) {
      console.log(error);
      socket.emit(SOCKET_EVENTS.CREATION_ERROR, error.message);
    }
  }
}
