import { IsNotEmpty, IsString } from "class-validator";
import { RespAdminApiDocSubSection } from "./apiDocSubSection.dto";

export class UpdateApiDocDTO {
  @IsString()
  language: string;
  @IsString()
  @IsNotEmpty()
  subSectionID: string;
  @IsString()
  title: string;
  @IsString()
  content: string;
}

export class CreateApiDocDTO {
  @IsString()
  @IsNotEmpty()
  sectionTitle: string;
}

export interface RespAdminApiDoc {
  sectionTitle: string;
  subSections: Array<RespAdminApiDocSubSection>;
}
