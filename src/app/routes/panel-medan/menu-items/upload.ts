export class Upload {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  ukuran:number;
  // createdAt: Date = new Date();
  createdAt: number;

  constructor(file:File) {
    this.file = file;
  }
}