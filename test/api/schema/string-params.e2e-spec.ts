import { AppModule } from "@modules/app/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

describe("POST: /api/schema (string params)", () => {
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
      id: "id.uuid",
      image: "image.fashion",
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("image");
      })
      .end(done);
  });

  it("Pass a not existing schema. Should throw an error", (done) => {
    const schema = {
      id: "id.uid",
      name: "per.firstName",
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

  it("Pass a not exist schema option. Should throw an error", (done) => {
    const schema = {
      id: "id.uid",
      name: "person.firstName",
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

  it("Pass arguments in dataType.int option", (done) => {
    const schema = {
      age: "dataType.integer<min=18;max=30>",
    };

    request(app.getHttpServer())
      .post("/api/schema")
      .send(schema)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        const age = response.body.age;
        expect(age).toBeGreaterThanOrEqual(18);
        expect(age).toBeLessThanOrEqual(30);
      })
      .end(done);
  });

  it("Pass no arguments to schema field", async () => {
    const schemaTest1 = {
      age: "dataType.integer<>",
    };

    const schemaTest2 = {
      age: "dataType.integer<    >",
    };

    await request(app.getHttpServer())
      .post("/api/schema")
      .send(schemaTest1)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        const age = response.body.age;
        expect(typeof age).toBe("number");
      });

    await request(app.getHttpServer())
      .post("/api/schema")
      .send(schemaTest2)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        const age = response.body.age;
        expect(typeof age).toBe("number");
      });
  });

  it("No pass > character in arguments declaration. Should throw an error", (done) => {
    const schema = {
      age: "dataType.integer<min=18",
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
});
