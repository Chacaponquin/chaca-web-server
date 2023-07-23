import { DatasetModelService } from "@modules/dataset-model/services/dataset-model.service";
import { Controller } from "@nestjs/common";
import { UserService } from "../services/user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly datasetModelService: DatasetModelService,
  ) {}
}
