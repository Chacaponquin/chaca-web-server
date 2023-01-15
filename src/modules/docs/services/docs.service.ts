import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { AppLanguages } from "@shared/interfaces/language.interface";
import * as fs from "fs";
import * as path from "path";
import { API_SECTIONS } from "../constants/API_SECTIONS";
import { RespApiSection } from "../interfaces/apiSections.interface";

@Injectable()
export class DocsService {
  async readDoc({
    section,
    document,
    language,
  }: {
    document: string;
    language: string;
    section: string;
  }): Promise<string> {
    try {
      const data = await fs.promises.readFile(
        path.join(
          __dirname,
          `../docs/${section}/${this.filterLanguage(language)}/${document}.md`,
        ),
        "utf8",
      );

      return data;
    } catch (error) {
      throw new HttpException(
        `The document '${document}' do not exists`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private filterLanguage(lan: string): AppLanguages {
    if (lan === "es" || lan === "en") return lan;
    else return "en";
  }

  public getApiSections(lan: string): Array<RespApiSection> {
    const filtLanguage = this.filterLanguage(lan);
    return API_SECTIONS.map((s) => {
      return {
        sectionTitle: s.sectionTitle[filtLanguage],
        subSections: s.subSections.map((sub) => {
          return {
            title: sub.title[filtLanguage],
            route: `${s.section}/${sub.document}`,
          };
        }),
      };
    });
  }
}
