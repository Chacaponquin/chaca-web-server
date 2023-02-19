import {
  Get,
  Controller,
  Headers,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { RespApiDocSection } from "../dto/apiDocSection.dto";
import { DocsService } from "../services/docs.service";

@Controller("docs")
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get("/guides/custom")
  async getCustomFormGuide(
    @Headers("language") language: string,
  ): Promise<string> {
    return await this.docsService.readDoc({
      section: "guides",
      document: "CustomFormDocs",
      language,
    });
  }

  @Get("/guides/ref")
  async getRefFormGuide(
    @Headers("language") language: string,
  ): Promise<string> {
    return await this.docsService.readDoc({
      section: "guides",
      document: "RefFormDocs",
      language,
    });
  }

  @Get("subSection/:section/:subSection")
  async getApiDocument(
    @Headers("language") language: string,
    @Param("section") section: string,
    @Param("subSection") subSection: string,
  ): Promise<string> {
    const content = await this.docsService.findSubSectionContentByParent(
      section,
      subSection,
      language,
    );

    if (content) {
      return content;
    } else {
      throw new NotFoundException();
    }
  }

  @Get("/sections")
  public async getDocSections(
    @Headers("language") language: string,
  ): Promise<Array<RespApiDocSection>> {
    return this.docsService.getApiSections(language);
  }
}
