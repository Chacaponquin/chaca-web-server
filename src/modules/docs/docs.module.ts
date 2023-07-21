import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import { SharedService } from "@shared/services/language.service";
import { DocsController } from "./controller/docs.controller";
import { ApiDocSchema } from "./schema/apiDoc.schema";
import { ApiDocSubSectionSchema } from "./schema/apiDocSubSection.schema";
import { AdminDocsService } from "./services/admin-docs.service";
import { DocsService } from "./services/docs.service";

@Module({
  controllers: [DocsController],
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.API_DOCS, useFactory: () => ApiDocSchema },
      {
        name: DB_MOELS.API_DOCS_SUB_SECTION,
        useFactory: () => ApiDocSubSectionSchema,
      },
    ]),
  ],
  exports: [DocsService, AdminDocsService],
  providers: [DocsService, SharedService, AdminDocsService],
})
export class DocsModule {}
