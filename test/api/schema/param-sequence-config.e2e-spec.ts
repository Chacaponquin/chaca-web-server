import { AppModule } from "@modules/app/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";


describe("Create schemas with sequence fields in configuration", () => {
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

  it("Create a schema with sequence field without config", (done) => {
    const schema = {
      id: {
        fieldType: "sequence",
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
        expect(response.body.id).toBe(1);
        
      })
      .end(done);
  });
});
