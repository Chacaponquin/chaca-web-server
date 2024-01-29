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
import { DatasetCreationError } from "@modules/dataset/exceptions/dataset";
import { DATASETS_ERROR_HTTP_STATUS } from "@modules/dataset/constants/DATASETS_ERROR_HTTP_STATUS";
import * as fs from "fs";

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

      const directory_name = "";
      const filenames = fs.readdirSync(directory_name);

      console.log("\nFilenames in directory:");

      filenames.forEach((file) => {
        console.log("File:", file);
      });

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
