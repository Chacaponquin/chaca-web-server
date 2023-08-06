import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@modules/app/app.module";
import * as request from "supertest";

describe("POST: /api/schema/array", () => {
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

  describe("Config documents schema", () => {
    it("Pass a not object as schema config. Should thrown an error", async () => {
      await request(app.getHttpServer())
        .post("/api/schema/array")
        .send({ schema: 5 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        });

      await request(app.getHttpServer())
        .post("/api/schema/array")
        .send({ schema: "" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        });

      await request(app.getHttpServer())
        .post("/api/schema/array")
        .send({ schema: null })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        });
    });
  });

  describe("Config count documents", () => {
    const schema = {
      id: {
        fieldType: "id.uuid",
      },
      user: {
        fieldType: {
          type: "schema",
          params: {
            id: "id.uuid",
            age: "dataType.integer<min=18;max=80>",
          },
        },
      },
    };

    it("Pass no count documents. Should return a random array with schema documents", (done) => {
      request(app.getHttpServer())
        .post("/api/schema/array")
        .send({ schema })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.CREATED);

          expect(response.body.length).toBeGreaterThanOrEqual(1);
          expect(response.body.length).toBeLessThanOrEqual(10);
        })
        .end(done);
    });

    it("Pass count=5. Should return an array with 5 elements", (done) => {
      request(app.getHttpServer())
        .post("/api/schema/array")
        .send({ schema, count: 5 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.CREATED);

          expect(response.body).toHaveLength(5);
        })
        .end(done);
    });

    it("Pass count=-5. Should throw an error", (done) => {
      request(app.getHttpServer())
        .post("/api/schema/array")
        .send({ schema, count: -5 })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect((response) => {
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        })
        .end(done);
    });
  });
});
