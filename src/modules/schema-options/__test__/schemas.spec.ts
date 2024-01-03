import { INestApplication } from "@nestjs/common";
import { SchemaOptionsService } from "../services/schema-options.service";
import { Test, TestingModule } from "@nestjs/testing";
import { SCHEMAS } from "../constants";
import { Schema } from "../domain";
import { SchemaOptionsRepository } from "../services/schema-options-repository.service";
import { LanguageModule } from "@modules/app/modules/language/language.module";

describe("# Schema Options Service Tests", () => {
  let app: INestApplication;
  let service: SchemaOptionsService;

  const allSchemas: Array<Schema> = SCHEMAS;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LanguageModule],
      controllers: [],
      exports: [SchemaOptionsService],
      providers: [SchemaOptionsRepository, SchemaOptionsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = app.get(SchemaOptionsService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("Test all options are defined", () => {
    it("Get all schemas", () => {
      const allSchemas = service.allSchemas();
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
