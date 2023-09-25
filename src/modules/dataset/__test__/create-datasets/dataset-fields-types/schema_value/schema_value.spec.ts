import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config mixed field for dataset creation", () => {
  let service: DatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaOptionsModule],
      exports: [DatasetService],
      providers: [DatasetService],
    }).compile();

    service = module.get(DatasetService);
  });

  it("Create field with id.uuid option without arguments", () => {
    const data = service.createSingleDocument([
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
