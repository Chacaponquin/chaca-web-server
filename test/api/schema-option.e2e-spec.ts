import { ApiController } from "@modules/api/controller/api.controller";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";

describe("GET: /api/:schema/:option", () => {
  let app: INestApplication;
  let apiController: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    apiController = app.get(ApiController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Schema without arguments", () => {
    it("Pass schema=id & option=uuid. Should return a string", () => {
      const result = apiController.valueBySchema("id", "uuid", {});
      expect(typeof result).toBe("string");
    });
  });
});
