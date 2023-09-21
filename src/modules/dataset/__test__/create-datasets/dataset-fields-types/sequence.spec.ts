import { DATA_TYPES } from "@modules/dataset/constants/DATA_TYPE";
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

  it("Create a not argument sequence field", () => {
    const data = service.createDocuments(
      [{ name: "seq", dataType: { type: DATA_TYPES.SEQUENCE } }],
      10,
    );

    let valid = true;
    for (let i = 0; i < data.length && valid; i++) {
      if (data[i].seq !== i + 1) {
        valid = false;
      }
    }

    expect(valid).toBe(true);
  });
});
