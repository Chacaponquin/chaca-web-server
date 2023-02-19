export interface RespApiDocSection {
  sectionTitle: string;
  frontRoute: string;
  subSections: Array<{
    title: string;
    frontRoute: string;
  }>;
}
