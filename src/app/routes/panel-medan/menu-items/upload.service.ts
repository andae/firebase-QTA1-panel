import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';
declare var $: any;
import { Observable } from 'rxjs';
import { Upload } from './upload';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private basePathStorage:string = '/produkToko';
  // private basePathDb: string = '/menuItems';

  uploads: AngularFireList<Upload[]>;

  percentage: Observable<number>;

  pushUpload(upload: Upload) {
  	let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePathStorage}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    	upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      upload.ukuran = uploadTask.snapshot.totalBytes;
    },
    (err) => {
    	console.log("pesan error: " + err);
    },
    () => {
    	upload.url = uploadTask.snapshot.downloadURL
    	upload.name = upload.file.name
    	this.saveFileData(upload);
    });
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePathStorage}/`).push(upload).then(res => {
      // console.log("res saveFileData - upload.service:: " + res.key);
      // localStorage.setItem('keyGambar', res.key);
    });
  }

  // deleteUpload(upload: Upload) {
  //   this.deleteFileData(upload.$key)
  //   .then( () => {
  //     this.deleteFileStorage(upload.name)
  //   })
  //   .catch(error => console.log(error))
  // }

  // // Deletes the file details from the realtime db
  // private deleteFileData(key: string) {
  //   return this.db.list(`${this.basePath}/`).remove(key);
  // }

  // // Firebase files must have unique names in their respective storage dir
  // // So the name serves as a unique key
  // private deleteFileStorage(name:string) {
  //   let storageRef = firebase.storage().ref();
  //   storageRef.child(`${this.basePath}/${name}`).delete()
  // }

  private baseStorage:string = '/produkToko';
  private basePath:string = '/menuItems';

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
