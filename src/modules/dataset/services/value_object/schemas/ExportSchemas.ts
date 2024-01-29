import { MultiGenerateSchema, chaca, Extensions } from "chaca";
import { Generator } from "./Generator";
import * as path from "path";
import * as fs from "fs";

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
    const location = path.join(__dirname);

    const func = async () => {
      const filePath = await chaca.exportFromSchemas(
        this.schemas,
        {
          format: { ext: extension, zip: true },
          location: location,
          fileName: filename,
        },
        { verbose: false },
      );

      const filenames = await fs.promises.readdir(path.join(__dirname));

      console.log("\nFilenames in directory:");

      filenames.forEach((file) => {
        console.log("File:", file);
      });

      return filePath;
    };

    const filePath = await this.gen(func);

    return filePath as string;
  }
}
