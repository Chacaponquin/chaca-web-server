import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { SharedService } from "@shared/services/language.service";
import { Model } from "mongoose";
import { IApiDocSubSection } from "../interfaces/apiDocSubSection.interface";
import { IApiDoc, IApiDocPopulated } from "../interfaces/apiSections.interface";
import { RespAdminApiDoc } from "@modules/admin/modules/docs/dto/apiDoc.dto";
import { LanguageOptions } from "@shared/interfaces/language.interface";
import { RepeatLanguageTitleError } from "../errors";
import { schemas } from "chaca";

@Injectable()
export class AdminDocsService {
  constructor(
    @InjectModel(DB_MOELS.API_DOCS)
    private readonly apiDocModel: Model<IApiDoc>,
    @InjectModel(DB_MOELS.API_DOCS_SUB_SECTION)
    private readonly apiDocSubSectionModel: Model<IApiDocSubSection>,
    private readonly sharedService: SharedService,
  ) {}

  private async populateApiSections(): Promise<Array<IApiDocPopulated>> {
    return (await this.apiDocModel
      .find()
      .populate("subSections")) as Array<IApiDocPopulated>;
  }

  private async validateApiDocSubSectionTitle(
    subSectionID: string,
    newTitle: LanguageOptions,
  ): Promise<void> {
    const apiSections = await this.populateApiSections();

    const foundParentSection = apiSections.find((s) => {
      let is = false;

      if (s.subSections.some((sub) => sub.id === subSectionID)) {
        is = true;
      }

      return is;
    });

    if (foundParentSection) {
      const subSections = foundParentSection.subSections;

      const languageKeys = Object.keys(newTitle);

      for (let j = 0; j < languageKeys.length; j++) {
        for (let i = 0; i < subSections.length; i++) {
          if (subSections[i].id !== subSectionID) {
            const sectionTitle = subSections[i].title[
              languageKeys[j]
            ] as string;
            const newDocTitle = newTitle[languageKeys[j]] as string;

            if (
              sectionTitle.trim().toLowerCase() ===
              newDocTitle.trim().toLowerCase()
            ) {
              throw new RepeatLanguageTitleError();
            }
          }
        }
      }
    }
  }

  private async validateApiDocTitle(
    newSectionTitle: LanguageOptions,
  ): Promise<void> {
    const apiSections = await this.populateApiSections();

    const languageKeys = Object.keys(newSectionTitle);

    for (let j = 0; j < languageKeys.length; j++) {
      for (let i = 0; i < apiSections.length; i++) {
        const sectionTitle = apiSections[i].sectionTitle[
          languageKeys[j]
        ] as string;
        const newDocTitle = newSectionTitle[languageKeys[j]] as string;

        if (
          sectionTitle.trim().toLowerCase() === newDocTitle.trim().toLowerCase()
        ) {
          throw new RepeatLanguageTitleError();
        }
      }
    }
  }

  public async createNewApiDocSection(
    sectionTitle: LanguageOptions,
  ): Promise<void> {
    await this.validateApiDocTitle(sectionTitle);

    const newApiDoc = new this.apiDocModel({
      sectionTitle,
    });

    await newApiDoc.save();
  }

  public async addNewSubSection(parentSectionID: string): Promise<string> {
    const newSection = new this.apiDocSubSectionModel({
      title: {
        en: "New SubSection" + schemas.id.mongodbID().getValue(),
        es: "New SubSection" + schemas.id.mongodbID().getValue(),
      },
      content: { en: "New SubSection Content", es: "New SubSection Content" },
    });

    await newSection.save();

    await this.apiDocModel.findByIdAndUpdate(parentSectionID, {
      $push: { subSections: newSection.id },
    });

    return newSection.id;
  }

  public async updateApiDoc(
    subSectionID: string,
    title: LanguageOptions,
    content: LanguageOptions,
  ): Promise<void> {
    const foundSubSection = await this.apiDocSubSectionModel.findById(
      subSectionID,
    );

    if (foundSubSection) {
      await this.validateApiDocSubSectionTitle(subSectionID, title);

      foundSubSection.content = content;
      foundSubSection.title = title;

      await foundSubSection.save();
    } else {
      throw new NotFoundException();
    }
  }

  public async deleteApiDocSubSection(subSectionID: string): Promise<void> {
    await this.apiDocSubSectionModel.findByIdAndDelete(subSectionID);
  }

  public async getApiDocSubSectionByID(subSectionID: string) {
    const foundSubSection = await this.apiDocSubSectionModel.findById(
      subSectionID,
    );

    return foundSubSection;
  }

  public async getAdminApiDocSections(): Promise<Array<RespAdminApiDoc>> {
    const apiSections = (await this.apiDocModel
      .find()
      .populate("subSections")) as Array<IApiDocPopulated>;

    const returnApiSections: Array<RespAdminApiDoc> = apiSections.map((s) => {
      return {
        _id: s._id,
        sectionTitle: s.titleToShow,
        subSections: s.subSections.map((subS) => {
          return { _id: subS._id, title: subS.titleToShow };
        }),
      };
    });

    return returnApiSections;
  }
}
