import { AppModule } from "@modules/app/app.module";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config mixed field for dataset creation", () => {
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

  it("Create field with id.uuid option without arguments", async () => {
    const data = await service.createSingleDocument([
      {
        name: "id",
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { schema: "id", option: "uuid" },
        },
      },
    ]);

    expect(typeof data.id).toBe("string");
  });
});
