import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { ApiController } from "@modules/api/controller/api.controller";
import { IncorrectFieldTypeException } from "@modules/api/exceptions";
import { IncorrectFieldArrayConfigException } from "@modules/dataset/exceptions";

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
    it("Pass schema with id, name. Should return an object with that fields", async () => {
      const schema = {
        id: "id.uuid",
        image: "image.fashion",
      };

      const result = apiController.getSchemaByConfig(schema);

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("image");
    });

    it("Pass a not existing schema. Should throw an error", () => {
      const schema = {
        id: "id.uid",
        name: "per.firstName",
      };

      expect(() => {
        apiController.getSchemaByConfig(schema);
      }).toThrow(IncorrectFieldTypeException);
    });

    it("Pass a not exist schema option. Should throw an error", () => {
      const schema = {
        id: "id.uid",
        name: "person.firstName",
      };

      expect(() => {
        apiController.getSchemaByConfig(schema);
      }).toThrow(IncorrectFieldTypeException);
    });

    it("Pass arguments in dataType.int option", () => {
      const schema = {
        age: "dataType.integer<min=18;max=30>",
      };

      const allResultSchemas = Array.from({ length: 1000 }).map(() =>
        apiController.getSchemaByConfig(schema),
      );

      expect(allResultSchemas.every((s) => s.age >= 18 && s.age <= 30)).toBe(
        true,
      );
    });

    it("Pass no arguments to schema field", () => {
      const schemaTest1 = {
        age: "dataType.integer<>",
      };

      const schemaTest2 = {
        age: "dataType.integer<    >",
      };

      const result1 = apiController.getSchemaByConfig(schemaTest1);
      const result2 = apiController.getSchemaByConfig(schemaTest2);

      expect(typeof result1.age).toBe("number");
      expect(typeof result2.age).toBe("number");
    });

    it("No pass > character in arguments declaration. Should throw an error", () => {
      const schema = {
        age: "dataType.integer<min=18",
      };

      expect(() => {
        apiController.getSchemaByConfig(schema);
      }).toThrow(IncorrectFieldTypeException);
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
