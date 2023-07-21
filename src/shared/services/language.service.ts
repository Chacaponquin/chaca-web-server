import { Injectable } from "@nestjs/common";
import { AppLanguages } from "@shared/interfaces/language.interface";

@Injectable()
export class LanguageService {
  filterLanguage(lan: string): AppLanguages {
    if (lan === "es" || lan === "en") return lan;
    else return "en";
  }
}
