import { Get, Controller, Headers, Param } from "@nestjs/common";
import { RespApiSection } from "../interfaces/apiSections.interface";
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

  @Get("/:section/:document")
  async getApiDocument(
    @Headers("language") language: string,
    @Param("section") section: string,
    @Param("document") document: string,
  ) {
    return await this.docsService.readDoc({ document, language, section });
  }

  @Get("/sections")
  getDocSections(@Headers("language") language: string): Array<RespApiSection> {
    return this.docsService.getApiSections(language);
  }
}
