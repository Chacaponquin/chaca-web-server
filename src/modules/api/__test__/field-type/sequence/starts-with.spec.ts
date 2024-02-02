import { ApiController } from "@modules/api/controller/api.controller";
import { AppModule } from "@modules/app/app.module";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { valid } from "./utils";

describe("Sequence field with starts-with config tests", () => {
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

  it("Create a sequence field with starts-with=-10. Should return sequence values with step=1 and starts-with=-10", async () => {
    const data = await controller.schemaArrayByConfig({
      schema: { sequence: { type: "sequence", params: { startsWith: -10 } } },
    });

    expect(valid(data, 1, -10)).toBe(true);
  });

  it("Create a sequence field with starts-with=undefined. Should return sequence values with step=1 and starts-with=1", async () => {
    const data = await controller.schemaArrayByConfig({
      schema: {
        sequence: { type: "sequence", params: { startsWith: undefined } },
      },
    });

    expect(valid(data, 1, 1)).toBe(true);
  });
});
