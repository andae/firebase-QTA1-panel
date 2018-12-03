import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';
declare var $: any;
import { Observable } from 'rxjs';

@Injectable()
export class UploadLelangService {

  constructor(private db: AngularFireDatabase) { }

  private baseStorage:string = '/produkLelang';
  private basePath:string = '/menusItems';

  deleteUpload(key: any, namaGambarBesar, namaGambarKecil) {
    this.deleteFileData(key).then(() => {
      this.deleteFileStorage(namaGambarBesar);
      this.deleteFileStorage(namaGambarKecil);
    }).catch(err => console.log("message err: " + err))
  }

  deleteUploadSingle(namaGambar) {
    this.deleteFileStorage(namaGambar);
  }

  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.baseStorage}/${name}`).delete()
  }

}
