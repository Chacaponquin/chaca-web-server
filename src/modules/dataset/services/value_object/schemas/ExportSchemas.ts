import { MultiGenerateSchema, chaca, Extensions } from "chaca";
import { Generator } from "./Generator";
import * as path from "path";
import { LOCAL_EXPORT_ROUTE } from "@modules/dataset/constants/EXPORT";

interface Props {
  extension: Extensions;
  filename: string;
}

export class ExportSchemas extends Generator {
  constructor(private readonly schemas: Array<MultiGenerateSchema>) {
    super();
  }

  public async generate({ extension, filename }: Props): Promise<string> {
    const func = async () => {
      const filePath = await chaca.exportFromSchemas(
        this.schemas,
        {
          format: { ext: extension, zip: true },
          location: path.join(LOCAL_EXPORT_ROUTE),
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
