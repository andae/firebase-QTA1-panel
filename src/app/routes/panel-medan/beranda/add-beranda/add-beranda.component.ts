import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import * as firebase from 'firebase';
declare var $: any;
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-add-beranda',
  templateUrl: './add-beranda.component.html',
  styleUrls: ['./add-beranda.component.scss']
})
export class AddBerandaComponent implements OnInit {

  public dataUploading: number;

  news :any= {
      thumbSatu: null,
      thumbDua: null,
      thumbTiga: null,
      thumbEmpat: null,
      thumbLima: null
  };

  gambar1: any = "assets/img/dummy.png";
  selectedFiles1: FileList;
  currentUpload1: Upload;
  public task1;

  gambar2: any = "assets/img/dummy.png";
  selectedFiles2: FileList;
  currentUpload2: Upload;
  public task2;

  gambar3: any = "assets/img/dummy.png";
  selectedFiles3: FileList;
  currentUpload3: Upload;
  public task3;

  gambar4: any = "assets/img/dummy.png";
  selectedFiles4: FileList;
  currentUpload4: Upload;
  public task4;

  gambar5: any = "assets/img/dummy.png";
  selectedFiles5: FileList;
  currentUpload5: Upload;
  public task5;

  urlGambar1;
  namaGambar1;
  urlGambar2;
  namaGambar2;
  urlGambar3;
  namaGambar3;
  urlGambar4;
  namaGambar4;
  urlGambar5;
  namaGambar5;

  private basePath: string = '/berandas';
 
  public newsColl:AngularFireList<any>;

  constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {

    this.newsColl = afs.list('berandas');
  }

  ngOnInit() { }

  private saveFileData(upload: Upload) {
    this.afs.list(`${this.basePath}/`).push(upload);
  }

  detectFiles1(event) {
    this.selectedFiles1 = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.gambar1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadGambar1() {
    let file = this.selectedFiles1.item(0);
    this.currentUpload1 = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload1.file.name}`).put(this.currentUpload1.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload1.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      this.currentUpload1.ukuran = uploadTask.snapshot.totalBytes;

      this.task1 = uploadTask;
    }, (err) => {
      console.log("err penambahan gambar kategori: " + err);
    }, () => {
      this.currentUpload1.url = uploadTask.snapshot.downloadURL
      this.currentUpload1.name = this.currentUpload1.file.name

      this.currentUpload1.createdAt = Date.now();
      
      this.saveFileData(this.currentUpload1);

      this.urlGambar1 = this.currentUpload1.url;
      this.namaGambar1 = this.currentUpload1.name;
    });
  }

  detectFiles2(event) {
    this.selectedFiles2 = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.gambar2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadGambar2() {
    let file = this.selectedFiles2.item(0);
    this.currentUpload2 = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload2.file.name}`).put(this.currentUpload2.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload2.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 200;
      this.currentUpload2.ukuran = uploadTask.snapshot.totalBytes;

      this.task2 = uploadTask;
    }, (err) => {
      console.log("err penambahan gambar kategori: " + err);
    }, () => {
      this.currentUpload2.url = uploadTask.snapshot.downloadURL
      this.currentUpload2.name = this.currentUpload2.file.name

      this.currentUpload2.createdAt = Date.now();
      
      this.saveFileData(this.currentUpload2);

      this.urlGambar2 = this.currentUpload2.url;
      this.namaGambar2 = this.currentUpload2.name;
    });
  }

  detectFiles3(event) {
    this.selectedFiles3 = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.gambar3 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadGambar3() {
    let file = this.selectedFiles3.item(0);
    this.currentUpload3 = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload3.file.name}`).put(this.currentUpload3.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload3.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 300;
      this.currentUpload3.ukuran = uploadTask.snapshot.totalBytes;

      this.task3 = uploadTask;
    }, (err) => {
      console.log("err penambahan gambar kategori: " + err);
    }, () => {
      this.currentUpload3.url = uploadTask.snapshot.downloadURL
      this.currentUpload3.name = this.currentUpload3.file.name

      this.currentUpload3.createdAt = Date.now();
      
      this.saveFileData(this.currentUpload3);

      this.urlGambar3 = this.currentUpload3.url;
      this.namaGambar3 = this.currentUpload3.name;
    });
  }

  detectFiles4(event) {
    this.selectedFiles4 = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.gambar4 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadGambar4() {
    let file = this.selectedFiles4.item(0);
    this.currentUpload4 = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload4.file.name}`).put(this.currentUpload4.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload4.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 400;
      this.currentUpload4.ukuran = uploadTask.snapshot.totalBytes;

      this.task4 = uploadTask;
    }, (err) => {
      console.log("err penambahan gambar kategori: " + err);
    }, () => {
      this.currentUpload4.url = uploadTask.snapshot.downloadURL
      this.currentUpload4.name = this.currentUpload4.file.name

      this.currentUpload4.createdAt = Date.now();
      
      this.saveFileData(this.currentUpload4);

      this.urlGambar4 = this.currentUpload4.url;
      this.namaGambar4 = this.currentUpload4.name;
    });
  }

  detectFiles5(event) {
    this.selectedFiles5 = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.gambar5 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadGambar5() {
    let file = this.selectedFiles5.item(0);
    this.currentUpload5 = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload5.file.name}`).put(this.currentUpload5.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload5.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 500;
      this.currentUpload5.ukuran = uploadTask.snapshot.totalBytes;

      this.task5 = uploadTask;
    }, (err) => {
      console.log("err penambahan gambar kategori: " + err);
    }, () => {
      this.currentUpload5.url = uploadTask.snapshot.downloadURL
      this.currentUpload5.name = this.currentUpload5.file.name

      this.currentUpload5.createdAt = Date.now();
      
      this.saveFileData(this.currentUpload5);

      this.urlGambar5 = this.currentUpload5.url;
      this.namaGambar5 = this.currentUpload5.name;
    });
  }

  simpanGambar() {
    this.toastr.info('beranda Berhasil Ditambahkan!', 'Success!');
    this.router.navigate(['/beranda/manageBeranda']);
  }

}
