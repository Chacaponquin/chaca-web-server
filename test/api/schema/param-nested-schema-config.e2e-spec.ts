import { AppModule } from "@modules/app/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";

describe("Create schemas with nested schemas in fields configuration", () => {
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

  it("Create a nested schema field correctly", (done) => {
    const schema = {
      id: {
        fieldType: "id.uuid",
      },
      user: {
        fieldType: "schema",
        params: {
          id: "id.uuid",
          age: "dataType.integer<min=18;max=80>",
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
        expect(response.body).toHaveProperty("user");

        expect(typeof response.body.user.id).toBe("string");
        expect(response.body.user.age).toBeGreaterThanOrEqual(18);
        expect(response.body.user.age).toBeLessThanOrEqual(80);
      })
      .end(done);
  });

  it("Create a nested schema field without params. Should return an empty object", async () => {
    const schema1 = {
      id: {
        fieldType: "id.uuid",
      },
      user: {
        fieldType: "schema",
        params: undefined,
      },
    };

    const schema2 = {
      id: {
        fieldType: "id.uuid",
      },
      user: {
        fieldType: "schema",
        params: undefined,
      },
    };

    await request(app.getHttpServer())
      .post("/api/schema")
      .send(schema1)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("user");

        expect(response.body.user).toStrictEqual({});
      });

    await request(app.getHttpServer())
      .post("/api/schema")
      .send(schema2)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("user");

        expect(response.body.user).toStrictEqual({});
      });
  });

  it("Create a schema with array nested schema field", (done) => {
    const schema = {
      user: {
        fieldType: "schema",
        isArray: 10,
        params: {
          id: "id.uuid",
          age: "dataType.integer<min=18;max=80>",
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
        expect(response.body).toHaveProperty("user");

        expect(response.body.user).toHaveLength(10);
      })
      .end(done);
  });
});
