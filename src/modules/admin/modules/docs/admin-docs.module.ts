import { DocsModule } from "@modules/docs/docs.module";
import { Module } from "@nestjs/common";

@Module({ imports: [DocsModule], controllers: [], exports: [], providers: [] })
export class AdminDocsModule {}
