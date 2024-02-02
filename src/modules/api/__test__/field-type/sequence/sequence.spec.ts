import { ApiController } from "@modules/api/controller/api.controller";
import { AppModule } from "@modules/app/app.module";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { valid } from "./utils";

describe("Sequence field tests", () => {
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

  it("Create a not argument sequence field without config. Should return sequence values with step=1", async () => {
    const data = await controller.schemaArrayByConfig({
      schema: { sequence: { type: "sequence", params: {} } },
    });

    expect(valid(data, 1, 1)).toBe(true);
  });

  it("Create sequence field with params=null. Should return sequence values with step=1", async () => {
    const data = await controller.schemaArrayByConfig({
      schema: { sequence: { type: "sequence", params: null as any } },
    });

    expect(valid(data, 1, 1)).toBe(true);
  });
});
