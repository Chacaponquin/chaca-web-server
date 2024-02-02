import { AppModule } from "@modules/app/app.module";
import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
import { IncorrectFieldNameException } from "@modules/dataset/exceptions/field";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config field name tests in dataset creation", () => {
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

  it("Pass an empty string. Should throw an error", () => {
    expect(async () => {
      await service.createSingleDocument([
        { name: "", dataType: { type: DATA_TYPES.ENUM, values: [] } },
      ]);
    }).rejects.toThrow(IncorrectFieldNameException);
  });

  it("Pass a '  '. Should throw an error", () => {
    expect(async () => {
      await service.createSingleDocument([
        { name: "     ", dataType: { type: DATA_TYPES.ENUM, values: [] } },
      ]);
    }).rejects.toThrow(IncorrectFieldNameException);
  });

  it("Pass two fields with the same name should return an object with only 1 field. Should throw an error", async () => {
    const dataset1 = await service.createSingleDocument([
      { name: "id", dataType: { type: DATA_TYPES.MIXED, object: [] } },
      { name: "id", dataType: { type: DATA_TYPES.MIXED, object: [] } },
    ]);

    const dataset2 = await service.createSingleDocument([
      { name: "  id ", dataType: { type: DATA_TYPES.MIXED, object: [] } },
      {
        name: "id            ",
        dataType: { type: DATA_TYPES.MIXED, object: [] },
      },
    ]);

    expect(Object.entries(dataset1)).toHaveLength(1);
    expect(Object.entries(dataset2)).toHaveLength(1);
  });
});
