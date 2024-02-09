import { ApiController } from "@modules/api/controller/api.controller";
import { AppModule } from "@modules/app/app.module";
import { IncorrectDefinedFieldDatatypeException } from "@modules/dataset/exceptions/field";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Sequential field tests", () => {
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

  it("Create a sequential field with empty values. Should throw an error", async () => {
    await expect(async () => {
      await controller.schemaArrayByConfig({
        schema: {
          sequential: { type: "sequential", params: { values: [] } },
        },
        count: 5,
      });
    }).rejects.toThrow(IncorrectDefinedFieldDatatypeException);
  });

  it("Create a sequential fields with values=undefined. Should thrown an error", async () => {
    await expect(async () => {
      await controller.schemaArrayByConfig({
        schema: {
          sequential: { type: "sequential", params: { values: undefined } },
        },
        count: 5,
      });
    }).rejects.toThrow(IncorrectDefinedFieldDatatypeException);
  });
});
