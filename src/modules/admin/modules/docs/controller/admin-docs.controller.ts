import { AdminDocsService } from "@modules/docs/services/admin-docs.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  public async createApiDoc(@Body() createApiDocDTO: CreateApiDocDTO) {
    await this.adminDocsService.createNewApiDocSection(
      createApiDocDTO.sectionTitle,
      createApiDocDTO.language,
    );
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
    const { content, language, subSectionID, title } = updateApiDocDTO;

    await this.adminDocsService.updateApiDoc(
      subSectionID,
      language,
      title,
      content,
    );
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
