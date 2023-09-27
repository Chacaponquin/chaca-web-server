import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { DatasetCreationError } from "@modules/dataset/exceptions";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config enum field for dataset creation", () => {
  let service: DatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaOptionsModule],
      exports: [DatasetService],
      providers: [DatasetService],
    }).compile();

    service = module.get(DatasetService);
  });

  it("Create a ref field that ref a id", () => {
    const LIMIT = 30;
    const datasets = service.createDatasets([
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
      {
        name: "Dataset2",
        limit: LIMIT,
        fields: [
          {
            name: "ref",
            dataType: { type: DATA_TYPES.REF, ref: ["Dataset1.id"] },
          },
        ],
      },
    ]);

    expect(datasets.Dataset2.some((v) => v === datasets.Dataset1[0]));
  });

  it("Ref a not existing dataset field. Should throw an error", () => {
    const LIMIT = 30;
    expect(() =>
      service.createDatasets([
        {
          name: "Dataset2",
          limit: LIMIT,
          fields: [
            {
              name: "ref",
              dataType: { type: DATA_TYPES.REF, ref: ["Dataset1.id"] },
            },
          ],
        },
      ]),
    ).toThrow(DatasetCreationError);
  });
});
