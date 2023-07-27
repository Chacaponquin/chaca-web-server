import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { ApiController } from "@modules/api/controller/api.controller";
import { IncorrectFieldTypeException } from "@modules/api/exceptions";

describe("ApiController (e2e)", () => {
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

  describe("POST: /api/schema", () => {
    it("Pass schema with id, name. Should return an object with that fields", async () => {
      const schema = {
        id: "id.uuid",
        name: "person.firstName",
      };

      const result = apiController.getSchemaByConfig(schema);

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
    });

    it("Pass a not exist schema option. Should throw an error", () => {
      const schema = {
        id: "id.uuid54252",
        name: "person.firstName",
      };

      expect(() => {
        apiController.getSchemaByConfig(schema);
      }).toThrow(IncorrectFieldTypeException);
    });
  });
});
