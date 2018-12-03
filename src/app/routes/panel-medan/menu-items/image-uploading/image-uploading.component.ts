import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from "lodash";

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
declare var $: any;
import { Upload } from '../upload';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-image-uploading',
  templateUrl: './image-uploading.component.html',
  styleUrls: ['./image-uploading.component.scss']
})
export class ImageUploadingComponent implements OnInit {

    selectedFiles: FileList;
    currentUpload: Upload;

    currentUploadKecil: Upload;
    selectedFilesKecil: FileList;

    gambarBesar: any = "assets/img/dummy.png";
    gambarKecil: any = "assets/img/dummy.png";

    namaGambarBesar;
    namaGambarKecil;

    public urlGambarBesar;
    public urlGambarKecil;

    public taskBesar;
    public taskKecil;

    private basePath: string = '/produkToko';

    menuItemsdataRef: AngularFireObject<any>;
    
  	constructor(public uploadService: UploadService, private db: AngularFireDatabase,
      private route: ActivatedRoute, public router: Router) { 

      this.route.params.map(params => params['id']).subscribe((id) => {
        if(id != null) {
          this.menuItemsdataRef = this.db.object('/menuItems/' + id);
        }
      });
    }

  	ngOnInit() { }

    detectFiles(event) {
      this.selectedFiles = event.target.files;

      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.gambarBesar = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    detectFilesKecil(ev) {
    	this.selectedFilesKecil = ev.target.files;

      if (ev.target.files && ev.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.gambarKecil = event.target.result;
        }
        reader.readAsDataURL(ev.target.files[0]);
      }
    }

    private saveFileData(upload: Upload) {
      this.db.list(`${this.basePath}/`).push(upload);
    }

    uploadSingleBesar() {
      let file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        this.currentUpload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        this.currentUpload.ukuran = uploadTask.snapshot.totalBytes;

        this.taskBesar = uploadTask;
      },
      (err) => {
        console.log("pesan error: " + err);
      },
      () => {
        this.currentUpload.url = uploadTask.snapshot.downloadURL
        this.currentUpload.name = this.currentUpload.file.name
        this.saveFileData(this.currentUpload);

        this.namaGambarBesar = this.currentUpload.name;
        this.urlGambarBesar = this.currentUpload.url;
        console.log("this.urlGambarBesar:: " + this.urlGambarBesar);
      });
    }

    uploadSingleKecil() {
    	let file = this.selectedFilesKecil.item(0);
      this.currentUploadKecil = new Upload(file);

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/${this.currentUploadKecil.file.name}`).put(this.currentUploadKecil.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
        this.currentUploadKecil.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        this.currentUploadKecil.ukuran = uploadTask.snapshot.totalBytes;

        this.taskKecil = uploadTask;
      }, (err) => {
        console.log("pesan err: " + err);
      }, () => {
        this.currentUploadKecil.url = uploadTask.snapshot.downloadURL
        this.currentUploadKecil.name = this.currentUploadKecil.file.name
        this.saveFileData(this.currentUploadKecil);

        this.namaGambarKecil = this.currentUploadKecil.name;
        this.urlGambarKecil = this.currentUploadKecil.url;
        console.log("this.urlGambarKecil:: " + this.urlGambarKecil);
      })
    }

    simpanGambar() {
      console.log("simpan urlGambarBesar:: " + this.urlGambarBesar);
      console.log("simpan nama GambarBesar:: " + this.namaGambarBesar);

      console.log("simpan urlGambarKecil:: " + this.urlGambarKecil);
      console.log("simpan nama GambarKecil:: " + this.namaGambarKecil);

      this.menuItemsdataRef.update({
        urlGambarBesar: this.urlGambarBesar,
        namaGambarBesar: this.namaGambarBesar,

        urlGambarKecil: this.urlGambarKecil,
        namaGambarKecil: this.namaGambarKecil
      }).then((res) => {
        this.router.navigate(['/menu/manageItems']);
      });
    }

}
