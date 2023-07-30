import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from "supertest";

describe("POST: /api/schema", () => {
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
            fieldType: {
              type: "dataType.integer",
              params: {
                min: 5,
                max: 10,
              },
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
            fieldType: {
              type: "dataType.integer",
              params: null,
            },
          },
        };

        const schema2 = {
          int: {
            fieldType: {
              type: "dataType.integer",
              params: 5,
            },
          },
        };

        await request(app.getHttpServer())
          .post("/api/schema")
          .send(schema1)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect((response) => {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
          });

        await request(app.getHttpServer())
          .post("/api/schema")
          .send(schema2)
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect((response) => {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
          });
      });

      it("Pass schema with undefined as params configuration", (done) => {
        const schema = {
          int: {
            fieldType: {
              type: "dataType.integer",
              params: undefined,
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
            expect(typeof response.body.int).toBe("number");
          })
          .end(done);
      });
    });

    describe("Create schemas with array field configuration", () => {
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

    describe("Create schemas with nested schemas in fields configuration", () => {
      it("Create a nested schema field correctly", (done) => {
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
            fieldType: {
              type: "schema",
              params: undefined,
            },
          },
        };

        const schema2 = {
          id: {
            fieldType: "id.uuid",
          },
          user: {
            fieldType: {
              type: "schema",
              params: undefined,
            },
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
            fieldType: {
              type: "schema",
              params: {
                id: "id.uuid",
                age: "dataType.integer<min=18;max=80>",
              },
            },
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
            expect(response.body).toHaveProperty("user");

            expect(response.body.user).toHaveLength(10);
          })
          .end(done);
      });
    });
  });
});
