import { DatasetModelService } from "@modules/dataset-model/services/dataset-model.service";
import { SchemaOptionsService } from "@modules/schema-options/services/schema-options.service";
import { UserService } from "@modules/user/services/user.service";
import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { DatasetsGenerator, FileGenerator } from "./classes/Generators";
import { SOCKET_EVENTS } from "./constants/SOCKET_EVENTS.enum";
import { CreateDatasetDTO } from "./dto";
import { SocketService } from "./services/socket.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class SocketGateway {
  constructor(
    private readonly schemaOptionsService: SchemaOptionsService,
    private readonly userService: UserService,
    private readonly datasetModelService: DatasetModelService,
    private readonly socketService: SocketService,
  ) {}

  @WebSocketServer()
  public server: Server;

  @SubscribeMessage(SOCKET_EVENTS.CREATE_DATASETS)
  async createDatasets(
    @MessageBody() body: CreateDatasetDTO,
    @ConnectedSocket() socket: any,
  ) {
    try {
      const datasetTrees = this.socketService.createDatasetsTrees(
        body.datasets,
      );

      const resultDatasets = new DatasetsGenerator(
        socket,
        datasetTrees,
      ).createData();

      const fileURL = await new FileGenerator(
        resultDatasets,
        body.config,
      ).generateFile();

      if (body.config.saveSchema && socket.user) {
        const { description, name, tags } = body.config.saveSchema;

        for (const dat of datasetTrees) {
          const newModelID = await this.datasetModelService.createModel({
            description,
            name,
            tags,
            author: socket.user,
            model: JSON.stringify(dat.getDatasetModel()),
          });

          await this.userService.setNewDatasetModel(socket.user, newModelID);
        }
      }

      socket.emit(SOCKET_EVENTS.GET_FILE_URL, fileURL);
    } catch (error) {
      console.log(error);
      socket.emit(SOCKET_EVENTS.CREATION_ERROR, "");
    }
  }
}
