import { Get, Controller, Headers, NotFoundException } from "@nestjs/common";
import { DocsService } from "../services/docs.service";
import { NotFoundDocException } from "../exceptions";

@Controller("docs")
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get("/guides/custom")
  async getCustomFormGuide(
    @Headers("language") language: string,
  ): Promise<string> {
    try {
      const content = await this.docsService.getCustomFieldDocs(language);
      return content;
    } catch (error) {
      if (error instanceof NotFoundDocException) {
        throw new NotFoundException();
      } else {
        throw error;
      }
    }
  }

  @Get("/guides/ref")
  async getRefFormGuide(
    @Headers("language") language: string,
  ): Promise<string> {
    try {
      const content = await this.docsService.getRefFieldDocs(language);
      return content;
    } catch (error) {
      if (error instanceof NotFoundDocException) {
        throw new NotFoundException();
      } else {
        throw error;
      }
    }
  }
}
