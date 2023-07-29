import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import * as request from "supertest";

describe("GET: /api/:schema/:option", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Schema option without arguments", () => {
    it("Pass schema=id & option=uuid. Should return a string", (done) => {
      request(app.getHttpServer())
        .get("/api/id/uuid")
        .expect((response) => {
          expect(response.status).toBe(200);
          console.log(response.body);
        })
        .end(done);
    });
  });

  describe("Schema option array values", () => {
    it("Pass isArray=5 as query param. Should return an array with", (done) => {
      request(app.getHttpServer())
        .get("/api/id/uuid?isArray=5")
        .expect((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveLength(5);
        })
        .end(done);
    });
  });
});
