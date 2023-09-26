import { IncorrectFieldTypeException } from "@modules/api/exceptions";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { CustomValueField } from "@modules/dataset/services/value_object/field_type";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config enum field for dataset creation", () => {
  let service: DatasetService;

  const START_FUNCTION_STRING = CustomValueField.START_FUNCTION_STRING;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaOptionsModule],
      exports: [DatasetService],
      providers: [DatasetService],
    }).compile();

    service = module.get(DatasetService);
  });

  it("Create a custom field with empty string as function. Should throw an error", () => {
    expect(() =>
      service.createSingleDocument([
        { name: "custom", dataType: { type: DATA_TYPES.CUSTOM, code: "" } },
      ]),
    ).toThrow(IncorrectFieldTypeException);
  });

  it("Create a custom that returns 'Hello world'", () => {
    const data = service.createSingleDocument([
      {
        name: "custom",
        dataType: {
          type: DATA_TYPES.CUSTOM,
          code: `${START_FUNCTION_STRING} return 'Hello world' }`,
        },
      },
    ]);

    expect(data.custom).toBe("Hello world");
  });
});
