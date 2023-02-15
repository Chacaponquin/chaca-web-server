import { IsNotEmpty, IsString } from "class-validator";

export class CreateApiDocSubSectionDTO {
  @IsString()
  @IsNotEmpty()
  parentSectionID: string;
}

export interface RespAdminApiDocSubSection {
  _id: string;
  title: string;
}
