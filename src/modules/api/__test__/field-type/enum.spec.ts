import { ApiController } from "@modules/api/controller/api.controller";
import { AppModule } from "@modules/app/app.module";
import { IncorrectDefinedFieldDatatypeException } from "@modules/dataset/exceptions/field";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Enum field tests", () => {
  let app: INestApplication;
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = app.get(ApiController);
  });

  afterAll(async () => {
    await app.close();
  });

  it("Pass [1, 2, 3, 4, 5] as values. Should return one of this values", async () => {
    const result = await controller.schemaByConfig({
      enum: { type: "enum", params: { values: [1, 2, 3, 4, 5] } },
    });

    expect(result).toHaveProperty("enum");
    expect([1, 2, 3, 4, 5].includes(result.enum)).toBe(true);
  });

  it("Pass no values param. Should throw an empty enum error", async () => {
    await expect(async () => {
      await controller.schemaByConfig({
        enum: { type: "enum", params: {} },
      });
    }).rejects.toThrow(IncorrectDefinedFieldDatatypeException);
  });
});
