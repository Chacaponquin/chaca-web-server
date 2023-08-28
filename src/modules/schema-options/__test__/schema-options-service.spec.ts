import { INestApplication } from "@nestjs/common";
import { SchemaOptionsService } from "../services/schema-options.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@modules/app/app.module";
import { NotFoundOptionError, NotFoundSchemaError } from "../exceptions";
import { Schema } from "../interfaces/options";
import { SCHEMAS } from "../constants/Phone/Phone";

describe("# Schema Options Service Tests", () => {
  let app: INestApplication;
  let service: SchemaOptionsService;

  const allSchemas: Array<Schema> = SCHEMAS;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = app.get(SchemaOptionsService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Test find schema option", () => {
    it("Find schema=id & option=uuid. Should return an existing schema option", () => {
      const foundOption = service.findSchemaOption("id", "uuid");
      expect(foundOption).toBeDefined();
    });

    it("Pass a not exist schema option. Should throw an error", () => {
      expect(() => service.findSchemaOption("id", "uid")).toThrow(
        NotFoundOptionError,
      );
    });

    it("Pass a not existing schema. Should throw error", () => {
      expect(() => service.findSchemaOption("id32", "uid")).toThrow(
        NotFoundSchemaError,
      );
    });
  });

  describe("Test all options are defined", () => {
    it("Get all schemas", () => {
      const allSchemas = service.getAllSchemas();
      expect(allSchemas.length).toBeGreaterThan(0);
    });

    describe("Test schema options", () => {
      for (const schema of allSchemas) {
        describe(`${schema.name} schema options`, () => {
          for (const option of schema.options) {
            it(`Test ${option.name} return a defined value`, () => {
              const value = option.schemaField().getValue();
              expect(value).toBeDefined();
            });
          }
        });
      }
    });
  });
});
