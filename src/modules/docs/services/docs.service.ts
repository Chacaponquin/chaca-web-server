import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { SharedService } from "@shared/services/shared.service";
import * as fs from "fs";
import { Model } from "mongoose";
import * as path from "path";
import { RespApiDocSection } from "../dto/apiDocSection.dto";
import { IApiDocSubSection } from "../interfaces/apiDocSubSection.interface";
import { IApiDoc, IApiDocPopulated } from "../interfaces/apiSections.interface";

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

  private async populateApiSections(): Promise<Array<IApiDocPopulated>> {
    return (await this.apiDocModel
      .find()
      .populate("subSections")) as Array<IApiDocPopulated>;
  }

  public async findSubSectionContentByParent(
    section: string,
    subSection: string,
    language: string,
  ): Promise<string | null> {
    let returnContent: string | null = null;

    const apiSections = await this.populateApiSections();

    const findParent = apiSections.find(
      (s) => this.getSectionFrontRoute(s.sectionTitle.en) === section,
    );

    if (findParent) {
      const findSubSection = findParent.subSections.find((sub) => {
        return this.getSectionFrontRoute(sub.title.en) === subSection;
      });

      if (findSubSection) {
        const content = findSubSection.content;
        returnContent = content[this.sharedService.filterLanguage(language)];
      }
    }

    return returnContent;
  }

  public async getApiSections(lan: string): Promise<Array<RespApiDocSection>> {
    const apiSections = await this.populateApiSections();

    const filtLanguage = this.sharedService.filterLanguage(lan);
    return apiSections.map((s) => {
      return {
        sectionTitle: s.sectionTitle[filtLanguage],
        frontRoute: this.getSectionFrontRoute(s.sectionTitle.en),
        subSections: s.subSections.map((sub) => {
          return {
            title: sub.title[filtLanguage],
            frontRoute: this.getSectionFrontRoute(sub.title.en),
          };
        }),
      };
    });
  }

  private getSectionFrontRoute(title: string): string {
    const splitString = title
      .trim()
      .toLowerCase()
      .split(" ")
      .map((s) => {
        let retrStr = "";

        for (let i = 0; i < s.length; i++) {
          if (!["?"].includes(s[i])) {
            retrStr += s[i];
          }
        }

        return retrStr;
      })
      .join("-");

    return splitString;
  }
}
