import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { DatasetModelSchema } from "./infrastructure/mongo/schema/schema";
import { DatasetModelService } from "./services/dataset-model.service";
import { DatasetModelRepository } from "./services/dataset-model-repository.service";
import { DatasetModelMongoRepository } from "./infrastructure/mongo/dataset-model-mongo-repository.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.DATASET_MODEL, useFactory: () => DatasetModelSchema },
    ]),
  ],
  controllers: [],
  exports: [DatasetModelService, DatasetModelMongoRepository],
  providers: [
    DatasetModelRepository,
    DatasetModelMongoRepository,
    DatasetModelService,
  ],
})
export class DatasetModelModule {}
