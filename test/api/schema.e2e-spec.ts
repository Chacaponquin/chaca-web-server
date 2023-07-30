import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { ApiController } from "@modules/api/controller/api.controller";
import { IncorrectFieldTypeException } from "@modules/api/exceptions";
import { IncorrectFieldArrayConfigException } from "@modules/dataset/exceptions";
import * as request from "supertest";

describe("POST: /api/schema", () => {
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

  describe("POST: /api/schema (string params)", () => {
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

  describe("POST: /api/schema (object params)", () => {
    describe("Create schemas with simple value configurations", () => {
      it("Pass schema with id, name. Should return an object with that fields", () => {
        const schema = {
          id: {
            fieldType: "id.uuid",
          },
          name: {
            fieldType: "person.fullName",
          },
        };

        const result = apiController.getSchemaByConfig(schema);

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
      });

      it("No pass config.fieldType in fields. Should throw an error", () => {
        const schema = {
          id: {},
          name: {},
        };

        expect(() => {
          apiController.getSchemaByConfig(schema);
        }).toThrow(IncorrectFieldTypeException);
      });

      it("Pass a not existing schema option. Should throw an error", () => {
        const schema = {
          id: {
            fieldType: "id.uid",
          },
        };

        expect(() => {
          apiController.getSchemaByConfig(schema);
        }).toThrow(IncorrectFieldTypeException);
      });
    });

    describe("Create schemas with array field configuration", () => {
      it("Pass config.isArray=10 number. Should return an array with", () => {
        const schema = {
          id: {
            fieldType: "id.uuid",
            isArray: 10,
          },
        };

        const result = apiController.getSchemaByConfig(schema);

        expect(result.id.length).toBe(10);
      });

      it("Pass config.isArray=null. Should return a not array field value", () => {
        const schema = {
          id: {
            fieldType: "id.uuid",
            isArray: null,
          },
        };

        const result = apiController.getSchemaByConfig(schema);
        expect(typeof result.id).toBe("string");
      });

      it("Pass config.isArray=-10. Should throw an error", () => {
        const schema = {
          id: {
            fieldType: "id.uuid",
            isArray: -10,
          },
        };

        expect(() => apiController.getSchemaByConfig(schema)).toThrow(
          IncorrectFieldArrayConfigException,
        );
      });

      it("Pass empty object as isArray configuration. Should return an array field between 0 and 10 elements", () => {
        const schema = {
          id: {
            fieldType: "id.uuid",
            isArray: {},
          },
        };

        const result = apiController.getSchemaByConfig(schema);
        expect(result.id.length >= 0 && result.id.length <= 10).toBe(true);
      });
    });
  });
});
