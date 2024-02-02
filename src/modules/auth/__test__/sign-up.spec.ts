import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../controller/auth.controller";
import { UserService } from "@modules/user/services/user.service";
import { AppModule } from "@modules/app/app.module";
import { INestApplication } from "@nestjs/common";
import { CreateSimpleUserDTO } from "@modules/user/dto/create";
import { schemas } from "chaca";
import {
  InvalidUserEmailException,
  InvalidUserPasswordException,
  InvalidusernameException,
} from "@modules/user/exceptions";

describe("# Login Tests", () => {
  let app: INestApplication;
  let authController: AuthController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authController = app.get(AuthController);
    userService = app.get(UserService);
  });

  afterAll(async () => {
    await userService.clean();
    await app.close();
  });

  describe("SignUp simple user", () => {
    it("Create user with correct arguments", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: "Test User",
      };

      const token = await authController.signUp(params);

      expect(token).toBeDefined();
    });

    it("Create user with empty username. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: "",
      };

      await expect(
        async () => await authController.signUp(params),
      ).rejects.toThrow(InvalidusernameException);
    });

    it("Create user with empty password. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: "",
        username: schemas.internet.username().getValue(),
      };

      await expect(
        async () => await authController.signUp(params),
      ).rejects.toThrow(InvalidUserPasswordException);
    });

    it("Create user with empty email. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: "",
        password: schemas.internet.password().getValue(),
        username: schemas.internet.username().getValue(),
      };

      await expect(
        async () => await authController.signUp(params),
      ).rejects.toThrow(InvalidUserEmailException);
    });

    it("Create an user with repeat email. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: schemas.internet.username().getValue(),
      };

      const token = await authController.signUp(params);

      expect(token).toBeDefined();
    });
  });
});
