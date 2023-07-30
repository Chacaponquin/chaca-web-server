import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@modules/app/app.module";
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
          expect(response.status).toBe(HttpStatus.OK);
          expect(typeof response.text).toBe("string");
        })
        .end(done);
    });

    it("Pass a not existing schema. Should throw an error", (done) => {
      request(app.getHttpServer())
        .get("/api/id3243/uuid")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.NOT_FOUND);
          expect(typeof response.text).toBe("string");
        })
        .end(done);
    });

    it("Pass a not existing schema option. Should throw an error", (done) => {
      request(app.getHttpServer())
        .get("/api/id/uid")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.NOT_FOUND);
          expect(typeof response.text).toBe("string");
        })
        .end(done);
    });
  });

  describe("Schema option with argumentes", () => {
    it("Pass schema=dataType & option=integer, and pass min=5 & max=10 as arguments", (done) => {
      request(app.getHttpServer())
        .get("/api/dataType/integer?min=5&max=10")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.OK);
          expect(Number(response.text)).toBeGreaterThanOrEqual(5);
          expect(Number(response.text)).toBeLessThanOrEqual(10);
        })
        .end(done);
    });

    it("Pass schema=dataType & option=integer, and pass min=undefined & max=5 as arguments", (done) => {
      request(app.getHttpServer())
        .get("/api/dataType/integer?min=undefined&max=5")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.OK);
          expect(Number(response.text)).toBeLessThanOrEqual(5);
        })
        .end(done);
    });
  });

  describe("Schema option array values", () => {
    it("Pass isArray=5 as query param. Should return an array with", (done) => {
      request(app.getHttpServer())
        .get("/api/id/uuid?isArray=5")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.OK);
          expect(response.body).toHaveLength(5);
        })
        .end(done);
    });

    it("Pass a string as isArray value. Should return a simple value", (done) => {
      request(app.getHttpServer())
        .get("/api/id/uuid?isArray=hi")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.OK);
          expect(typeof response.text).toBe("string");
        })
        .end(done);
    });

    it("Pass a number less than 0 as isArray argument. Should throw an error", (done) => {
      request(app.getHttpServer())
        .get("/api/id/uuid?isArray=-20")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        })
        .end(done);
    });
  });
});
