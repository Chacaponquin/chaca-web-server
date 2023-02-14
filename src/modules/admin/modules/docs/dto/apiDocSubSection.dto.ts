import { IsNotEmpty, IsString } from "class-validator";

export class CreateApiDocSubSectionDTO {
  @IsString()
  @IsNotEmpty()
  parentSectionID: string;
  @IsString()
  @IsNotEmpty()
  subSectionTitle: string;
}

export interface RespAdminApiDocSubSection {
  _id: string;
  title: string;
}
