import { MultiGenerateSchema, chaca, Extensions } from "chaca";
import { Generator } from "./Generator";
// import * as path from "path";

interface Props {
  extension: Extensions;
  filename: string;
}

export class ExportSchemas extends Generator {
  private readonly PUBLIC_ROUTE = "../../../../../data";

  constructor(private readonly schemas: Array<MultiGenerateSchema>) {
    super();
  }

  public async generate({ extension, filename }: Props): Promise<string> {
    const func = async () => {
      const filePath = await chaca.exportFromSchemas(
        this.schemas,
        {
          format: { ext: extension, zip: true },
          location: "/dev/xvda", // path.join(__dirname, this.PUBLIC_ROUTE),
          fileName: filename,
        },
        { verbose: false },
      );

      return filePath;
    };

    const filePath = await this.gen(func);

    return filePath as string;
  }
}
