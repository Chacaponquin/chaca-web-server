import { AppModule } from "@modules/app/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe("Create schemas with simple value configurations", () => {
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

  it("Pass schema with id, name. Should return an object with that fields", (done) => {
    const schema = {
      id: {
        fieldType: "id.uuid",
      },
      name: {
        fieldType: "person.fullName",
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
        expect(response.body).toHaveProperty("name");
      })
      .end(done);
  });

  it("No pass config.fieldType in fields. Should throw an error", (done) => {
    const schema = {
      id: {},
      name: {},
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

  it("Pass a not existing schema option. Should throw an error", (done) => {
    const schema = {
      id: {
        fieldType: "id.uid",
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

  it("Pass schema with params configuration", (done) => {
    const schema = {
      int: {
        fieldType: "dataType.integer",
        params: {
          min: 5,
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

        expect(response.body).toHaveProperty("int");
        expect(response.body.int).toBeGreaterThanOrEqual(5);
        expect(response.body.int).toBeLessThanOrEqual(10);
      })
      .end(done);
  });

  it("Pass schema with incorrect params configuration", async () => {
    const schema1 = {
      int: {
        fieldType: "dataType.integer",
        params: null,
      },
    };

    const schema2 = {
      int: {
        fieldType: "dataType.integer",
        params: 5,
      },
    };

    await request(app.getHttpServer())
      .post("/api/schema")
      .send(schema1)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);
      });

    await request(app.getHttpServer())
      .post("/api/schema")
      .send(schema2)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);
      });
  });

  it("Pass schema with undefined as params configuration", (done) => {
    const schema = {
      int: {
        fieldType: "dataType.integer",
        params: undefined,
      },
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("int");
        expect(typeof response.body.int).toBe("number");
      })
      .end(done);
  });
});
