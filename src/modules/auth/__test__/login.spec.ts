import { AppModule } from "@modules/app/app.module";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "@modules/user/services/user.service";
import { schemas } from "chaca";
import { CreateSimpleUserDTO } from "@modules/user/dto/create";
import { NotFoundUserToLoginException } from "../exceptions";
import { AuthController } from "../controller/auth.controller";

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

  it("Create an user and login with same email and password", async () => {
    const userPassword = schemas.internet.password().getValue();
    const userEmail = schemas.internet.email().getValue();

    const userParams: CreateSimpleUserDTO = {
      email: userEmail,
      password: userPassword,
      username: schemas.internet.username().getValue(),
    };

    const regToken = await authController.signUp(userParams);

    expect(regToken).toBeDefined();

    const token = await authController.signIn({
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
      username: schemas.internet.username().getValue(),
    };

    const regToken = await authController.signUp(userParams);

    expect(regToken).toBeDefined();

    await expect(
      async () =>
        await authController.signIn({
          email: "user@email.com",
          password: userPassword,
        }),
    ).rejects.toThrow(NotFoundUserToLoginException);
  });
});
