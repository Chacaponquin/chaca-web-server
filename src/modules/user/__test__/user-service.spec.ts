import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../services/user.service";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "@modules/app/app.module";
import {
  CreateGithubUserDTO,
  CreateGoogleUserDTO,
  CreateSimpleUserDTO,
} from "../dto/create";
import { GithubUser, GoogleUser, SimpleUser } from "../domain/User";
import {
  InvalidUserEmailException,
  InvalidUserPasswordException,
  InvalidusernameException,
  RepeatUserEmailError,
} from "../exceptions";
import { schemas } from "chaca";

describe("# User Service Tests", () => {
  let app: INestApplication;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = app.get(UserService);
  });

  afterAll(async () => {
    await service.clean();
    await app.close();
  });

  describe("Create github user", () => {
    it("Create github user with correct arguments", async () => {
      const params: CreateGithubUserDTO = {
        email: schemas.internet.email().getValue(),
        picture: schemas.image.people().getValue(),
        username: schemas.internet.username().getValue(),
      };

      const newUser = await service.createGithubUser(params);
      const foundUser = await service.findUserById(newUser.id);

      expect(foundUser).not.toBeNull();
      expect(foundUser).toBeInstanceOf(GithubUser);
    });

    it("Create github user without image. Should return an github user with image=null", async () => {
      const params1: CreateGithubUserDTO = {
        email: schemas.internet.email().getValue(),
        picture: null,
        username: schemas.internet.username().getValue(),
      };

      const params2: CreateGithubUserDTO = {
        email: schemas.internet.email().getValue(),
        picture: "   ",
        username: schemas.internet.username().getValue(),
      };

      const newUser1 = await service.createGithubUser(params1);
      const newUser2 = await service.createGithubUser(params2);

      const foundUser1 = await service.findUserById(newUser1.id);
      const foundUser2 = await service.findUserById(newUser2.id);

      expect(foundUser1).not.toBeNull();
      expect(foundUser1).toBeInstanceOf(GithubUser);
      expect(foundUser1?.image).toBeNull();

      expect(foundUser2).not.toBeNull();
      expect(foundUser2).toBeInstanceOf(GithubUser);
      expect(foundUser2?.image).toBeNull();
    });
  });

  describe("Create google user", () => {
    it("Create google user with correct arguments", async () => {
      const params: CreateGoogleUserDTO = {
        email: schemas.internet.email().getValue(),
        picture: schemas.image.people().getValue(),
        username: schemas.internet.username().getValue(),
      };

      const newUser = await service.createGoogleUser(params);
      const foundUser = await service.findUserById(newUser.id);

      expect(foundUser).not.toBeNull();
      expect(foundUser).toBeInstanceOf(GoogleUser);
    });

    it("Create google user without image. Should return an google user with image=null", async () => {
      const params1: CreateGithubUserDTO = {
        email: schemas.internet.email().getValue(),
        picture: null,
        username: schemas.internet.username().getValue(),
      };

      const params2: CreateGithubUserDTO = {
        email: schemas.internet.email().getValue(),
        picture: "   ",
        username: schemas.internet.username().getValue(),
      };

      const newUser1 = await service.createGoogleUser(params1);
      const newUser2 = await service.createGoogleUser(params2);

      const foundUser1 = await service.findUserById(newUser1.id);
      const foundUser2 = await service.findUserById(newUser2.id);

      expect(foundUser1).not.toBeNull();
      expect(foundUser1).toBeInstanceOf(GoogleUser);
      expect(foundUser1?.image).toBeNull();

      expect(foundUser2).not.toBeNull();
      expect(foundUser2).toBeInstanceOf(GoogleUser);
      expect(foundUser2?.image).toBeNull();
    });
  });

  describe("Create simple user", () => {
    it("Create user with correct arguments", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: "Test User",
      };

      const newUser = await service.createSimpleUser(params);
      const foundUser = await service.findUserById(newUser.id);

      expect(foundUser).not.toBeNull();
      expect(foundUser).toBeInstanceOf(SimpleUser);
    });

    it("Create user with empty username. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: "",
      };

      await expect(
        async () => await service.createSimpleUser(params),
      ).rejects.toThrow(InvalidusernameException);
    });

    it("Create user with empty password. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: "",
        username: schemas.internet.username().getValue(),
      };

      await expect(
        async () => await service.createSimpleUser(params),
      ).rejects.toThrow(InvalidUserPasswordException);
    });

    it("Create user with empty email. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: "",
        password: schemas.internet.password().getValue(),
        username: schemas.internet.username().getValue(),
      };

      await expect(
        async () => await service.createSimpleUser(params),
      ).rejects.toThrow(InvalidUserEmailException);
    });

    it("Create an user with repeat email. Should throw an error", async () => {
      const params: CreateSimpleUserDTO = {
        email: schemas.internet.email().getValue(),
        password: schemas.internet.password().getValue(),
        username: schemas.internet.username().getValue(),
      };

      const newUser = await service.createSimpleUser(params);
      const foundUser = await service.findUserById(newUser.id);

      expect(foundUser).not.toBeNull();
      await expect(
        async () => await service.createSimpleUser(params),
      ).rejects.toThrow(RepeatUserEmailError);
    });
  });
});
