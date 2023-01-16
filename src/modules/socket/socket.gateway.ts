import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DatasetsGenerator, FileGenerator } from "./classes/Generators";
import { SOCKET_EVENTS } from "./constants/SOCKET_EVENTS.enum";
import { CreateDatasetDTO } from "./dto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class SocketGateway {
  constructor(private readonly schemaOptionsService: SchemaOptionsService) {}

  @WebSocketServer()
  public server: Server;

  @SubscribeMessage(SOCKET_EVENTS.CREATE_DATASETS)
  async createDatasets(
    @MessageBody() body: CreateDatasetDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const data = new DatasetsGenerator(
        socket,
        body.datasets,
        this.schemaOptionsService.getSchemas(),
      ).createData();

      const fileURL = await new FileGenerator(data, body.config).generateFile();

      socket.emit(SOCKET_EVENTS.GET_FILE_URL, fileURL);
    } catch (error) {
      console.log(error);
      socket.emit(SOCKET_EVENTS.CREATION_ERROR, "");
    }
  }
}
