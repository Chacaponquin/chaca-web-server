import {
  IncorrectDatasetNameException,
  RepeatDatasetNameException,
} from "@modules/dataset/exceptions";
import { DatasetService } from "@modules/dataset/services/dataset.service";
import { SchemaOptionsModule } from "@modules/schema-options/schema-options.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("Config name dataset", () => {
  let service: DatasetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaOptionsModule],
      exports: [DatasetService],
      providers: [DatasetService],
    }).compile();

    service = module.get(DatasetService);
  });

  it("Create dataset with empty name. Should throw an error", () => {
    expect(() =>
      service.createDatasets([{ fields: [], limit: 20, name: "" }]),
    ).toThrow(IncorrectDatasetNameException);
  });

  it("Create datasets with repeat dataset name. Should throw an error", () => {
    expect(() => {
      service.createDatasets([
        { fields: [], limit: 20, name: "Test" },
        { name: "Test", fields: [], limit: 20 },
      ]);
    }).toThrow(RepeatDatasetNameException);
  });
});
