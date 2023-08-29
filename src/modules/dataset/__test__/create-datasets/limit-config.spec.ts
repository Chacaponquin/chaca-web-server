import { IncorrectDatasetLimitException } from "@modules/dataset/exceptions";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config limit datasets", () => {
  let service: DatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaOptionsModule],
      exports: [DatasetService],
      providers: [DatasetService],
    }).compile();

    service = module.get(DatasetService);
  });

  it("Create datasets with limit less than 0. Should throw an error", () => {
    expect(() =>
      service.createDatasets([
        { fields: [], limit: -20, name: "Test dataset" },
      ]),
    ).toThrow(IncorrectDatasetLimitException);
  });
});
