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

  it("Create an object with id and username", () => {
    const data = service.createSingleDocument([
      {
        name: "object",
        dataType: {
          type: DATA_TYPES.MIXED,
          object: [
            {
              name: "id",
              dataType: {
                type: DATA_TYPES.SINGLE_VALUE,
                fieldType: {
                  schema: "id",
                  option: "uuid",
                },
              },
            },
            {
              name: "username",
              dataType: {
                type: DATA_TYPES.SINGLE_VALUE,
                fieldType: { schema: "internet", option: "username" },
              },
            },
          ],
        },
      },
    ]);

    expect(data.object).toHaveProperty("id");
    expect(data.object).toHaveProperty("username");
    expect(typeof data.object.id).toBe("string");
    expect(typeof data.object.username).toBe("string");
  });
});
