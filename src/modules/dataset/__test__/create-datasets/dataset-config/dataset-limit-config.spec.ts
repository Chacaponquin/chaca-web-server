import { AppModule } from "@modules/app/app.module";
import { IncorrectDatasetLimitException } from "@modules/dataset/exceptions/dataset";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config limit datasets", () => {
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

  it("Create datasets with limit less than 0. Should throw an error", () => {
    expect(async () => {
      await service.createDatasets([
        { fields: [], limit: -20, name: "Test dataset" },
      ]);
    }).rejects.toThrow(IncorrectDatasetLimitException);
  });
});
