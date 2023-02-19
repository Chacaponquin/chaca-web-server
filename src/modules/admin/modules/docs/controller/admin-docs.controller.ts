import { RepeatLanguageTitleError } from "@modules/docs/errors";
import { AdminDocsService } from "@modules/docs/services/admin-docs.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateApiDocDTO, UpdateApiDocDTO } from "../dto/apiDoc.dto";
import { CreateApiDocSubSectionDTO } from "../dto/apiDocSubSection.dto";

@Controller("admin/docs")
export class AdminDocsController {
  constructor(private readonly adminDocsService: AdminDocsService) {}

  @Get("/apiDocs")
  public async getApiDocs() {
    return await this.adminDocsService.getAdminApiDocSections();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/newApiDoc")
  public async createApiDocSection(
    @Body() createApiDocDTO: CreateApiDocDTO,
  ): Promise<void> {
    try {
      await this.adminDocsService.createNewApiDocSection(
        createApiDocDTO.sectionTitle,
      );
    } catch (error) {
      if (error instanceof RepeatLanguageTitleError) {
        throw new HttpException(
          "That title aldready exists",
          HttpStatus.CONFLICT,
        );
      } else throw error;
    }
  }

  @Post("/newApiDocSubSection")
  @HttpCode(HttpStatus.CREATED)
  public async createApiDocSubSection(
    @Body() createApiDocSubSection: CreateApiDocSubSectionDTO,
  ) {
    const newSectionID = await this.adminDocsService.addNewSubSection(
      createApiDocSubSection.parentSectionID,
    );

    return newSectionID;
  }

  @HttpCode(HttpStatus.OK)
  @Put("/updateApiDoc")
  public async updateApiDoc(
    @Body() updateApiDocDTO: UpdateApiDocDTO,
  ): Promise<void> {
    const { content, subSectionID, title } = updateApiDocDTO;

    try {
      await this.adminDocsService.updateApiDoc(subSectionID, title, content);
    } catch (error) {
      if (error instanceof RepeatLanguageTitleError) {
        throw new HttpException(
          "That title aldready exists",
          HttpStatus.CONFLICT,
        );
      } else throw error;
    }
  }

  @Get("/getApiDocSubSection/:subSectionID")
  public async getApiDocSubSection(
    @Param("subSectionID") subSectionID: string,
  ) {
    const found = await this.adminDocsService.getApiDocSubSectionByID(
      subSectionID,
    );

    if (found) {
      return found;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete("/deleteApiDocSubSection/:subSectionID")
  public async deleteApiDocSubSection(
    @Param("subSectionID") subSectionID: string,
  ): Promise<void> {
    this.adminDocsService.deleteApiDocSubSection(subSectionID);
  }
}
