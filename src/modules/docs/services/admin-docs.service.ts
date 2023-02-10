import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { SharedService } from "@shared/services/shared.service";
import { Model } from "mongoose";
import { IApiDocSubSection } from "../interfaces/apiDocSubSection.interface";
import { IApiDoc, RespAdminApiDoc } from "../interfaces/apiSections.interface";

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
    } else {
      throw new NotFoundException();
    }
  }

  public async getAdminApiDocSections(): Promise<Array<RespAdminApiDoc>> {
    return await this.apiDocModel.find().populate("subSections");
  }
}
