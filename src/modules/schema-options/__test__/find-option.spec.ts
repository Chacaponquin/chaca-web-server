import { INestApplication } from "@nestjs/common";
import { SchemaOptionsService } from "../services/schema-options.service";
import { LanguageModule } from "@modules/app/modules/language/language.module";
import { Test, TestingModule } from "@nestjs/testing";
import { SchemaOptionsRepository } from "../services/schema-options-repository.service";
import { NotFoundOptionError, NotFoundSchemaError } from "../exceptions";

describe("Test find schema option", () => {
  let app: INestApplication;
  let service: SchemaOptionsService;

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
