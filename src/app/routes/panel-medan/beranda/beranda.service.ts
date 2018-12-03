import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
declare var $: any;

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BerandaService {

  constructor(public af:AngularFireDatabase) { }

  private baseStorage:string = '/berandas';
  private basePath:string = '/berandas';

  deleteUploadSingle(namaGambar) {
    this.deleteFileStorage(namaGambar);
  }

  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.baseStorage}/${name}`).delete()
  }

  deleteUpload(key: any, namaGambar) {
    this.deleteFileData(key).then(() => {
      this.deleteFileStorage(namaGambar);
    }).catch(err => console.log("message err: " + err))
  }

  private deleteFileData(key: string) {
    return this.af.list(`${this.basePath}/`).remove(key);
  }

}
