import { AppModule } from "@modules/app/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe("Create schemas with array field configuration", () => {
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

  it("Pass config.isArray=10 number. Should return an array with", (done) => {
    const schema = {
      id: {
        fieldType: "id.uuid",
        isArray: 10,
      },
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toHaveLength(10);
      })
      .end(done);
  });

  it("Pass config.isArray=null. Should return a not array field value", (done) => {
    const schema = {
      id: {
        fieldType: "id.uuid",
        isArray: null,
      },
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(typeof response.body.id).toBe("string");
      })
      .end(done);
  });

  it("Pass config.isArray=-10. Should throw an error", (done) => {
    const schema = {
      id: {
        fieldType: "id.uuid",
        isArray: -10,
      },
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      })
      .end(done);
  });

  it("Pass empty object as isArray configuration. Should return an array field between 0 and 10 elements", (done) => {
    const schema = {
      id: {
        fieldType: "id.uuid",
        isArray: {},
      },
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(
          response.body.id.length >= 0 && response.body.id.length <= 10,
        ).toBe(true);
      })
      .end(done);
  });

  it("Pass an object with min=8 & max=10. Should return an array field between 8 and 10 elements", (done) => {
    const schema = {
      id: {
        fieldType: "id.uuid",
        isArray: {
          min: 8,
          max: 10,
        },
      },
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(response.body.id.length).toBeGreaterThanOrEqual(8);
        expect(response.body.id.length).toBeLessThanOrEqual(10);
      })
      .end(done);
  });
});
