import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { SharedService } from "@shared/services/shared.service";
import * as fs from "fs";
import { Model } from "mongoose";
import * as path from "path";
import { API_SECTIONS } from "../constants/API_SECTIONS";
import { IApiDocSubSection } from "../interfaces/apiDocSubSection.interface";
import { IApiDoc, RespApiSection } from "../interfaces/apiSections.interface";

@Injectable()
export class DocsService {
  constructor(
    @InjectModel(DB_MOELS.API_DOCS)
    private readonly apiDocModel: Model<IApiDoc>,
    @InjectModel(DB_MOELS.API_DOCS_SUB_SECTION)
    private readonly apiDocSubSectionModel: Model<IApiDocSubSection>,
    private readonly sharedService: SharedService,
  ) {}

  public async readDoc({
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
          `../docs/${section}/${this.sharedService.filterLanguage(
            language,
          )}/${document}.md`,
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

  public getApiSections(lan: string): Array<RespApiSection> {
    const filtLanguage = this.sharedService.filterLanguage(lan);
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
