import { AppModule } from "@modules/app/app.module";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../services/auth.service";
import { UserService } from "@modules/user/services/user.service";
import { schemas } from "chaca";
import { CreateSimpleUserDTO } from "@modules/user/dto/create.dto";
import {
  InvalidUserEmailException,
  InvalidUserPasswordException,
  InvalidUsernameException,
} from "@modules/user/exceptions";
import { NotFoundUserToLoginException } from "../exceptions";

describe("# Auth Service Tests", () => {
  let app: INestApplication;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authService = app.get(AuthService);
    userService = app.get(UserService);
  });

  afterAll(async () => {
    await userService.clean();
    await app.close();
  });

  describe("Login user", () => {
    it("Create an user and login with same email and password", async () => {
      const userPassword = schemas.internet.password().getValue();
      const userEmail = schemas.internet.email().getValue();

      const userParams: CreateSimpleUserDTO = {
        email: userEmail,
        password: userPassword,
        username: schemas.internet.userName().getValue(),
      };

      const regToken = await authService.signUp(userParams);

      expect(regToken).toBeDefined();

      const token = await authService.loginUser({
        email: userEmail,
        password: userPassword,
      });

      expect(token).toBeDefined();
    });

    it("Login user with incorrect email. Should throw an error", async () => {
      const userPassword = schemas.internet.password().getValue();
      const userEmail = schemas.internet.email().getValue();

      const userParams: CreateSimpleUserDTO = {
        email: userEmail,
        password: userPassword,
        username: schemas.internet.userName().getValue(),
      };

      const regToken = await authService.signUp(userParams);

      expect(regToken).toBeDefined();

      await expect(
        async () =>
          await authService.loginUser({
            email: "user@email.com",
            password: userPassword,
          }),
      ).rejects.toThrow(NotFoundUserToLoginException);
    });
  });

  describe("SignUp simple user", () => {
    it("Create user with correct arguments", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: "Test User",
      };

      const token = await authService.signUp(params);

      expect(token).toBeDefined();
    });

    it("Create user with empty username. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: "",
      };

      await expect(
        async () => await authService.signUp(params),
      ).rejects.toThrow(InvalidUsernameException);
    });

    it("Create user with empty password. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: "",
        username: schemas.internet.userName().getValue(),
      };

      await expect(
        async () => await authService.signUp(params),
      ).rejects.toThrow(InvalidUserPasswordException);
    });

    it("Create user with empty email. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: "",
        password: schemas.internet.password().getValue(),
        username: schemas.internet.userName().getValue(),
      };

      await expect(
        async () => await authService.signUp(params),
      ).rejects.toThrow(InvalidUserEmailException);
    });

    it("Create an user with repeat email. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: schemas.internet.userName().getValue(),
      };

      const token = await authService.signUp(params);

      expect(token).toBeDefined();
    });
  });
});
