import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { DatasetService } from "@modules/dataset/services/dataset.service";

@Injectable()
export class SocketService {
  constructor(private readonly datasetService: DatasetService) {}
}
