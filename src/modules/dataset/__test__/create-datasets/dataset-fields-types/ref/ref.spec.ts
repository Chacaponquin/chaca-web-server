import { AppModule } from "@modules/app/app.module";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { DatasetCreationError } from "@modules/dataset/exceptions/dataset";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config enum field for dataset creation", () => {
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

  it("Create a ref field that ref a id", async () => {
    const LIMIT = 30;
    const datasets = await service.createDatasets([
      {
        name: "Dataset2",
        limit: LIMIT,
        fields: [
          {
            name: "ref",
            dataType: { type: DATA_TYPES.REF, ref: "Dataset1.id" },
          },
        ],
      },
      {
        name: "Dataset1",
        limit: LIMIT,
        fields: [
          {
            name: "id",
            dataType: {
              type: DATA_TYPES.SINGLE_VALUE,
              fieldType: { schema: "id", option: "uuid" },
            },
            isKey: true,
          },
        ],
      },
    ]);

    expect(datasets.Dataset2.some((v) => v === datasets.Dataset1[0]));
  });

  it("Try ref a not key field. Should throw an error", () => {
    const LIMIT = 30;

    expect(async () => {
      await service.createDatasets([
        {
          name: "Dataset1",
          limit: LIMIT,
          fields: [
            {
              name: "id",
              dataType: {
                type: DATA_TYPES.SINGLE_VALUE,
                fieldType: { schema: "id", option: "uuid" },
              },
            },
          ],
        },
        {
          name: "Dataset2",
          limit: LIMIT,
          fields: [
            {
              name: "ref",
              dataType: { type: DATA_TYPES.REF, ref: "Dataset1.id" },
            },
          ],
        },
      ]);
    }).rejects.toThrow(DatasetCreationError);
  });

  it("Ref a not existing dataset field. Should throw an error", () => {
    const LIMIT = 30;
    expect(async () => {
      await service.createDatasets([
        {
          name: "Dataset2",
          limit: LIMIT,
          fields: [
            {
              name: "ref",
              dataType: { type: DATA_TYPES.REF, ref: "Dataset1.id" },
            },
          ],
        },
      ]);
    }).rejects.toThrow(DatasetCreationError);
  });
});
