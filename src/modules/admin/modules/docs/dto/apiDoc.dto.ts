import { IsNotEmpty, IsString } from "class-validator";

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
