import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { SharedService } from "@shared/services/shared.service";
import { Model } from "mongoose";
import { IApiDocSubSection } from "../interfaces/apiDocSubSection.interface";
import { IApiDoc, IApiDocPopulated } from "../interfaces/apiSections.interface";
import { RespAdminApiDoc } from "@modules/admin/modules/docs/dto/apiDoc.dto";

@Injectable()
export class AdminDocsService {
  constructor(
    @InjectModel(DB_MOELS.API_DOCS)
    private readonly apiDocModel: Model<IApiDoc>,
    @InjectModel(DB_MOELS.API_DOCS_SUB_SECTION)
    private readonly apiDocSubSectionModel: Model<IApiDocSubSection>,
    private readonly sharedService: SharedService,
  ) {}

  public async createNewApiDocSection(sectionTitle: string): Promise<void> {
    const newApiDoc = new this.apiDocModel({ sectionTitle });
    await newApiDoc.save();
  }

  public async addNewSubSection(
    parentSectionID: string,
    subSectionTitle: string,
  ) {
    const newSection = new this.apiDocSubSectionModel({
      title: subSectionTitle,
    });

    await newSection.save();

    await this.apiDocModel.findByIdAndUpdate(parentSectionID, {
      $push: { subSections: newSection.id },
    });
  }

  public async updateApiDoc(
    subSectionID: string,
    language: string,
    title: string,
    content: string,
  ): Promise<void> {
    const foundSubSection = await this.apiDocSubSectionModel.findById(
      subSectionID,
    );

    if (foundSubSection) {
      foundSubSection.content[language] = content;
      foundSubSection.title[language] = title;

      await foundSubSection.save();
    } else {
      throw new NotFoundException();
    }
  }

  public async getAdminApiDocSections(): Promise<Array<RespAdminApiDoc>> {
    const apiSections = (await this.apiDocModel
      .find()
      .populate("subSections")) as Array<IApiDocPopulated>;

    const returnApiSections: Array<RespAdminApiDoc> = apiSections.map((s) => {
      return {
        _id: s._id,
        sectionTitle: s.sectionTitle["en"],
        subSections: s.subSections.map((subS) => {
          return { _id: subS._id, title: subS.title["en"] };
        }),
      };
    });

    return returnApiSections;
  }
}
