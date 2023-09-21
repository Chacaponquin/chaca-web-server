import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { IncorrectFieldNameException } from "@modules/dataset/exceptions";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config field name tests in dataset creation", () => {
  let service: DatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaOptionsModule],
      exports: [DatasetService],
      providers: [DatasetService],
    }).compile();

    service = module.get(DatasetService);
  });

  it("Pass an empty string. Should throw an error", () => {
    expect(() =>
      service.createSingleDocument([
        { name: "", dataType: { type: DATA_TYPES.ENUM, values: [] } },
      ]),
    ).toThrowError(IncorrectFieldNameException);
  });

  it("Pass a '  '. Should throw an error", () => {
    expect(() =>
      service.createSingleDocument([
        { name: "     ", dataType: { type: DATA_TYPES.ENUM, values: [] } },
      ]),
    ).toThrowError(IncorrectFieldNameException);
  });

  it("Pass two fields with the same name should return an object with only 1 field. Should throw an error", () => {
    const dataset = service.createSingleDocument([
      { name: "id", dataType: { type: DATA_TYPES.MIXED, object: [] } },
      { name: "id", dataType: { type: DATA_TYPES.MIXED, object: [] } },
    ]);

    const dataset2 = service.createSingleDocument([
      { name: "  id ", dataType: { type: DATA_TYPES.MIXED, object: [] } },
      {
        name: "id            ",
        dataType: { type: DATA_TYPES.MIXED, object: [] },
      },
    ]);

    expect(Object.entries(dataset)).toHaveLength(1);
    expect(Object.entries(dataset2)).toHaveLength(1);
  });
});
