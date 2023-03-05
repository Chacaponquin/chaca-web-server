import { InputConfig } from "@modules/socket/dto/configDTO.dto";
import { ChacaFileError } from "@modules/socket/errors/ChacaFileError";
import { ReturnDataset } from "@modules/socket/modules/dataset_generator/interfaces/dataset.interface";
import { Injectable } from "@nestjs/common";
import { FILE_TYPE } from "@shared/constants/FILE_TYPE.enum";
import { chaca, schemas } from "chaca";
import * as path from "path";
import * as AdmZip from "adm-zip";

@Injectable()
export class FileGeneratorService {
  private readonly PUBLIC_ROUTE = "../../../../data";

  public async createFile(
    data: ReturnDataset[],
    config: InputConfig,
  ): Promise<string> {
    const fileType = config.file.fileType as FILE_TYPE;
    // const args = this.config.file.arguments || {};

    if (Object.values(FILE_TYPE).includes(fileType)) {
      const allRoutes = [] as string[];

      for (const dat of data) {
        const fileRoute = path.join(__dirname, this.PUBLIC_ROUTE);

        const route = await chaca.export(dat.documents, {
          fileName: chaca.utils.camelCaseText(dat.name),
          format: fileType,
          location: fileRoute,
        });

        allRoutes.push(route);
      }

      return this.createFilesZip(allRoutes);
    } else {
      throw new ChacaFileError(`${fileType} is not a correct file type`);
    }
  }

  private createPublicRoute(zipName: string): string {
    return `util/downloadData/${zipName}`;
  }

  private createFilesZip(allRoutes: string[]): string {
    const zp = new AdmZip();
    const zipName = `data${schemas.id.mongodbID().getValue()}.zip`;
    const zipPath = path.join(__dirname, `${this.PUBLIC_ROUTE}/${zipName}`);

    for (const r of allRoutes) zp.addLocalFile(r);

    zp.writeZip(zipPath);

    return this.createPublicRoute(zipName);
  }
}
