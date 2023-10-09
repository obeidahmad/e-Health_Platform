export class FileUpload {
  // @ts-ignore
  key: string;
  // @ts-ignore
  name: string;
  // @ts-ignore
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
