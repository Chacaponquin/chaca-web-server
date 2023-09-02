import { AppModule } from "@modules/app/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { COMPLETE_SCHEMA } from "../utils";

describe("POST: /api/schema (examples)", () => {
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

  it("Pass complete schema example", (done) => {
    request(app.getHttpServer())
      .post("/api/schema")
      .send(COMPLETE_SCHEMA)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toBe(HttpStatus.CREATED);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("age");
        expect(response.body).toHaveProperty("posts");
        expect(response.body).toHaveProperty("socialMedia");

        expect(response.body.posts.length).toBeGreaterThanOrEqual(1);
        expect(response.body.posts.length).toBeLessThanOrEqual(10);

        expect(response.body.age).toBeGreaterThanOrEqual(18);
        expect(response.body.age).toBeLessThanOrEqual(90);

        expect(typeof response.body.socialMedia.facebook).toBe("string");
        expect(typeof response.body.socialMedia.instagram).toBe("string");
      })
      .end(done);
  });
});
