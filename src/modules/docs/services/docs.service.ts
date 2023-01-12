import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { AppLanguages } from "@shared/interfaces/language.interface";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class DocsService {
  async readDoc({
    category,
    fileName,
    language,
  }: {
    fileName: string;
    language: string;
    category: string;
  }): Promise<string> {
    try {
      const data = await fs.promises.readFile(
        path.join(
          __dirname,
          `../docs/${category}/${this.filterLanguage(language)}/${fileName}.md`,
        ),
        "utf8",
      );

      return data;
    } catch (error) {
      throw new HttpException(
        `The document '${fileName}' do not exists`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private filterLanguage(lan: string): AppLanguages {
    if (lan === "es" || lan === "en") return lan;
    else return "en";
  }
}
