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

  it("Create a not argument sequence field", async () => {
    const data = await service.createDocuments({
      datasetFields: [{ name: "seq", dataType: { type: DATA_TYPES.SEQUENCE } }],
      count: 10,
    });

    let valid = true;
    for (let i = 0; i < data.length && valid; i++) {
      if (data[i].seq !== i + 1) {
        valid = false;
      }
    }

    expect(valid).toBe(true);
  });
});
