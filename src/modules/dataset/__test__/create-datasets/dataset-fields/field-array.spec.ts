import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { IncorrectFieldArrayConfigException } from "@modules/dataset/exceptions";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config 'isArray' in dataset fields", () => {
  let service: DatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaOptionsModule],
      exports: [DatasetService],
      providers: [DatasetService],
    }).compile();

    service = module.get(DatasetService);
  });

  it("Pass isArray=null. Should return a no array field", () => {
    const result = service.createSingleDocument([
      {
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { args: {}, option: "uuid", schema: "id" },
        },
        name: "id",
      },
    ]);

    expect(typeof result.id).toBe("string");
  });

  it("Pass isArray.min greater than isArray.max. Should throw an error", () => {
    expect(() =>
      service.createSingleDocument([
        {
          isArray: { min: 20, max: 10 },
          dataType: {
            type: DATA_TYPES.SINGLE_VALUE,
            fieldType: { args: {}, option: "uuid", schema: "id" },
          },
          name: "id",
        },
      ]),
    ).toThrow(IncorrectFieldArrayConfigException);
  });

  it("Pass isArray.min or isArray.max less than 0. Should throw an error", () => {
    expect(() =>
      service.createSingleDocument([
        {
          isArray: { min: -20, max: 10 },
          dataType: {
            type: DATA_TYPES.SINGLE_VALUE,
            fieldType: { args: {}, option: "uuid", schema: "id" },
          },
          name: "id",
        },
      ]),
    ).toThrow(IncorrectFieldArrayConfigException);

    expect(() =>
      service.createSingleDocument([
        {
          isArray: { max: -10 },
          dataType: {
            type: DATA_TYPES.SINGLE_VALUE,
            fieldType: { args: {}, option: "uuid", schema: "id" },
          },
          name: "id",
        },
      ]),
    ).toThrow(IncorrectFieldArrayConfigException);
  });

  it("Pass isArray.min=10 & isArray.max=20. Should return a array field", () => {
    const result = service.createSingleDocument([
      {
        isArray: { max: 20, min: 10 },
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { args: {}, option: "uuid", schema: "id" },
        },
        name: "id",
      },
    ]);

    expect(result.id.length).toBeGreaterThanOrEqual(10);
    expect(result.id.length).toBeLessThanOrEqual(20);
  });

  it("Pass isArray.min=10. Should return a array field with 10 elements as minimun", () => {
    const result = service.createSingleDocument([
      {
        isArray: { min: 10 },
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { args: {}, option: "uuid", schema: "id" },
        },
        name: "id",
      },
    ]);

    expect(result.id.length).toBeGreaterThanOrEqual(10);
  });

  it("Pass isArray.max=5. Should return a array field with 5 elements as maximun", () => {
    const result = service.createSingleDocument([
      {
        isArray: { max: 5 },
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { args: {}, option: "uuid", schema: "id" },
        },
        name: "id",
      },
    ]);

    expect(result.id.length).toBeLessThanOrEqual(5);
  });

  it("Pass isArray=0. Should return a array field with 0 elements", () => {
    const result = service.createSingleDocument([
      {
        isArray: 0,
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { args: {}, option: "uuid", schema: "id" },
        },
        name: "id",
      },
    ]);

    expect(result.id).toHaveLength(0);
  });

  it("Pass isArray=5. Should return a array field with 5 elements", () => {
    const result = service.createSingleDocument([
      {
        isArray: 5,
        dataType: {
          type: DATA_TYPES.SINGLE_VALUE,
          fieldType: { option: "uuid", schema: "id" },
        },
        name: "id",
      },
    ]);

    expect(result.id).toHaveLength(5);
  });
});
