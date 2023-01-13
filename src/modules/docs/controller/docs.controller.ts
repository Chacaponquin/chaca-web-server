import { Get, Controller, Query } from "@nestjs/common";
import { DocsService } from "../services/docs.service";

@Controller("docs")
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get("/guides/custom")
  async getCustomFormGuide(
    @Query("language") language: string,
  ): Promise<string> {
    return await this.docsService.readDoc({
      category: "guides",
      fileName: "CustomFormDocs",
      language,
    });
  }

  @Get("/guides/ref")
  async getRefFormGuide(@Query("language") language: string): Promise<string> {
    return await this.docsService.readDoc({
      category: "guides",
      fileName: "RefFormDocs",
      language,
    });
  }

  @Get("/sections")
  async getDocSections(): Promise<Array<any>> {
    return [];
  }
}
