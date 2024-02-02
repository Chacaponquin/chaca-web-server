import { AppModule } from "@modules/app/app.module";
import {
  IncorrectDatasetNameException,
  RepeatDatasetNameException,
} from "@modules/dataset/exceptions/dataset";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config name dataset", () => {
  let service: DatasetService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = app.get(DatasetService);
  });

  afterAll(async () => {
    await app.close();
  });

  it("Create dataset with empty name. Should throw an error", () => {
    expect(async () => {
      await service.createDatasets([{ fields: [], limit: 20, name: "" }]);
    }).rejects.toThrow(IncorrectDatasetNameException);
  });

  it("Create datasets with repeat dataset name. Should throw an error", () => {
    expect(async () => {
      await service.createDatasets([
        { fields: [], limit: 20, name: "Test" },
        { name: "Test", fields: [], limit: 20 },
      ]);
    }).rejects.toThrow(RepeatDatasetNameException);
  });
});
