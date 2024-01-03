import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { IncorrectDefinedFieldDatatypeException } from "@modules/dataset/exceptions/field";
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

  it("Pass an empty array of values. Should throw an error", () => {
    expect(async () => {
      await service.createSingleDocument([
        { name: "id", dataType: { type: DATA_TYPES.ENUM, values: [] } },
      ]);
    }).rejects.toThrow(IncorrectDefinedFieldDatatypeException);
  });

  it("Pass an array of values", async () => {
    const values = [1, 2, 3, 4, 5];

    const data = await service.createSingleDocument([
      { name: "number", dataType: { type: DATA_TYPES.ENUM, values } },
    ]);

    expect(values.some((v) => data.number === v)).toBe(true);
  });

  it("Pass a not array values. Should throw an error", () => {
    expect(async () => {
      await service.createSingleDocument([
        {
          name: "number",
          dataType: { type: DATA_TYPES.ENUM, values: 5 as any },
        },
      ]);
    }).rejects.toThrow(IncorrectDefinedFieldDatatypeException);
  });
});
