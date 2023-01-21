import { DatasetModelService } from "@modules/dataset-model/services/dataset-model.service";
import {
  Controller,
  Delete,
  HttpStatus,
  HttpCode,
  Param,
  UseGuards,
  Request,
  HttpException,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { AuthGuard } from "@nestjs/passport";
import { Get } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly datasetModelService: DatasetModelService,
  ) {}

  @Get("/datasetModels")
  @UseGuards(AuthGuard("jwt"))
  async getUserDatasetModels(@Request() req: any) {
    const { id } = req.user;
    return await this.userService.getUserDatasetModels(id);
  }

  @Delete("/deleteModel/:modelID")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  async deleteModel(
    @Request() req: any,
    @Param("modelID") modelID: string,
  ): Promise<void> {
    const { id } = req.user;

    try {
      await this.userService.deleteModelFromUser(id, modelID);
      await this.datasetModelService.deleteModel(modelID);
    } catch (err) {
      throw new HttpException(
        `Error deleting the model ${modelID}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
