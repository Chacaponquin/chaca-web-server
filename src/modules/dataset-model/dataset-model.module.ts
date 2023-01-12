import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/enums/DB_MODELS.enum";
import { DatasetModelSchema } from "./schema/dataset-model.schema";
import { DatasetModelService } from "./services/dataset-model.service";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.DATASET_MODEL, useFactory: () => DatasetModelSchema },
    ]),
  ],
  controllers: [],
  exports: [DatasetModelService],
  providers: [DatasetModelService],
})
export class DatasetModelModule {}
