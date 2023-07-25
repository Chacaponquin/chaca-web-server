import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from "supertest";

describe("ApiController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe("POST: /api/schema", () => {
    it("Simple Schema test", () => {
      const schema = {
        id: "id.uuid",
        name: "person.firstName",
      };

      return request(app.getHttpServer())
        .post("/api/schema")
        .send(schema)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200);
    });
  });
});
