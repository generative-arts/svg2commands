import fs from 'fs';
import { parse } from 'svg-parser';

export class SvgReaderController {
  public static read(file: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        }
        const parsed = parse(data);
        resolve(parsed);
      });
    });
  }
}
