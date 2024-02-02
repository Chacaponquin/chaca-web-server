import { ApiController } from "@modules/api/controller/api.controller";
import { AppModule } from "@modules/app/app.module";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { valid } from "./utils";
import { IncorrectDefinedFieldDatatypeException } from "@modules/dataset/exceptions/field";

describe("Sequence field with step config tests", () => {
  let controller: ApiController;
  let app: INestApplication;

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

  it("Create a sequence field with step=5. Should return sequence values with step=5", async () => {
    const data = await controller.schemaArrayByConfig({
      schema: {
        sequence: { type: "sequence", params: { step: 5 } },
      },
      count: 10,
    });

    expect(valid(data, 5, 1)).toBe(true);
  });

  it("Create a sequence field with step=undefined. Should return sequence values with step=1", async () => {
    const data = await controller.schemaArrayByConfig({
      schema: { sequence: { type: "sequence", params: { step: undefined } } },
    });

    expect(valid(data, 1, 1)).toBe(true);
  });

  it("Create a sequence field with step=negative-number. Should throw an error", async () => {
    await expect(async () => {
      await controller.schemaArrayByConfig({
        schema: {
          sequence: { type: "sequence", params: { step: -10 } },
        },
      });
    }).rejects.toThrow(IncorrectDefinedFieldDatatypeException);
  });
});
