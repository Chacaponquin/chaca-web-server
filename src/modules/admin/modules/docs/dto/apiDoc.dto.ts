import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { RespAdminApiDocSubSection } from "./apiDocSubSection.dto";

class LanguageOptionsDTO {
  @IsString()
  @IsNotEmpty()
  en: string;
  @IsNotEmpty()
  @IsString()
  es: string;
}

export class UpdateApiDocDTO {
  @IsString()
  @IsNotEmpty()
  subSectionID: string;
  @IsObject()
  @ValidateNested()
  @Type(() => LanguageOptionsDTO)
  title: LanguageOptionsDTO;
  @IsObject()
  @ValidateNested()
  @Type(() => LanguageOptionsDTO)
  content: LanguageOptionsDTO;
}

export class CreateApiDocDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => LanguageOptionsDTO)
  sectionTitle: LanguageOptionsDTO;
}

export interface RespAdminApiDoc {
  sectionTitle: string;
  subSections: Array<RespAdminApiDocSubSection>;
}
