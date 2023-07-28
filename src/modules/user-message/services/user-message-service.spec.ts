import { Test, TestingModule } from "@nestjs/testing";
import { UserMessageService } from "./user-message.service";
import { CreateUserMessageDTO } from "../dto/user_message";
import { AppModule } from "src/app.module";
import { INestApplication } from "@nestjs/common";

describe("# User Message Services Test", () => {
  let app: INestApplication;
  let service: UserMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = app.get(UserMessageService);
  });

  afterAll(async () => {
    await service.clean();
    await app.close();
  });

  describe("Create user message", () => {
    it("Create a user message with correct arguments. Should return an created user", async () => {
      const params: CreateUserMessageDTO = {
        message: "Test message",
        name: "Test title",
        userEmail: "user@gmail.com",
      };

      const message = await service.createUserMessage(params);
      const foundMessage = await service.findMessageById(message.id);
      expect(foundMessage).not.toBeNull();
    });
  });
});
