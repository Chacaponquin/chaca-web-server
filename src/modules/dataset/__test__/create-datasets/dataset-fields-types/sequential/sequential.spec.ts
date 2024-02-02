import { AppModule } from "@modules/app/app.module";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config sequence field for dataset creation", () => {
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

  it("Create sequential field without arguments", async () => {
    const data = await service.createDocuments({
      datasetFields: [
        {
          name: "seq",
          dataType: { type: DATA_TYPES.SEQUENTIAL, values: [1, 2, 3, 4, 5] },
        },
      ],
      count: 5,
    });

    expect(data.every((v, i) => v.seq === i + 1)).toBe(true);
  });
});
