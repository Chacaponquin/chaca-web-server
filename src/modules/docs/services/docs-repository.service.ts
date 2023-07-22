import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { NotFoundDocException } from "../exceptions";

@Injectable()
export class DocsRepository {
  private readonly BASE_PATH = "../docs";
  private readonly GUIDES_PATH = `${this.BASE_PATH}/guides`;

  private async getGuideContent(
    guide: string,
    language: string,
  ): Promise<string> {
    try {
      const guidePath = path.join(
        __dirname,
        `${this.GUIDES_PATH}/${guide}/${language}.md`,
      );

      return await fs.promises.readFile(guidePath, "utf8");
    } catch (error) {
      throw new NotFoundDocException();
    }
  }

  public async getRefFieldDocs(language: string): Promise<string> {
    return await this.getGuideContent("ref", language);
  }

  public async getCustomFieldDocs(language: string): Promise<string> {
    return await this.getGuideContent("custom", language);
  }
}
