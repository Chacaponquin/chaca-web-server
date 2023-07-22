import { Injectable } from "@nestjs/common";
import { LanguageService } from "@shared/services/language.service";
import { DocsRepository } from "./docs-repository.service";

@Injectable()
export class DocsService {
  constructor(
    private readonly languageServices: LanguageService,
    private readonly repository: DocsRepository,
  ) {}

  public async getRefFieldDocs(language: string): Promise<string> {
    const lan = this.languageServices.filterLanguage(language);
    const content = await this.repository.getRefFieldDocs(lan);
    return content;
  }

  public async getCustomFieldDocs(language: string): Promise<string> {
    const lan = this.languageServices.filterLanguage(language);
    const content = await this.repository.getCustomFieldDocs(lan);
    return content;
  }
}
