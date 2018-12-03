import { Component } from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';
import * as firebase from 'firebase';
declare var $: any;
import {ToastrService} from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent {

  categories: any = {
    title: '',
    description: '',
    thumb: null,
    namaGambar: ''
  }

  gambarKategori: any = "assets/img/dummy.png";
  selectedFiles: FileList;
  currentUpload: Upload;

  private basePath: string = '/kategoriToko';
  public taskBesar;

  urlGambar;
  namaGambar;

  // url: any = "assets/img/dummy.png";

  public categoriesColl: AngularFireList<any>;

  constructor(public afs: AngularFireDatabase, public router: Router, public toastr: ToastrService) {

    this.categoriesColl = afs.list('categories');
  }

  onAddNews(form: NgForm) {
    var that = this;
    this.urlGambar = localStorage.getItem("urlGambar");
    this.namaGambar = localStorage.getItem("namaGambar");

    that.categories.thumb = this.urlGambar;
    that.categories.namaGambar = this.namaGambar;

    that.categoriesColl.push(that.categories).then(res => {
      that.toastr.success('Categories Data Added Successfully!', 'Success!');
      that.router.navigate(['/categories/manageCategories']);
    }, error => {
      this.toastr.error('error penambahan data!', 'Error!');
    });

    console.log("this.urlGambar --> " + this.urlGambar);
    console.log("this.namaGambar --> " + this.namaGambar);

    localStorage.removeItem("urlGambar");
    localStorage.removeItem("namaGambar");
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.gambarKategori = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadKategori() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      this.currentUpload.ukuran = uploadTask.snapshot.totalBytes;

      this.taskBesar = uploadTask;
    }, (err) => {
      console.log("err penambahan gambar kategori: " + err);
    }, () => {
      this.currentUpload.url = uploadTask.snapshot.downloadURL
      this.currentUpload.name = this.currentUpload.file.name
      this.saveFileData(this.currentUpload);

      this.urlGambar = this.currentUpload.url;
      this.namaGambar = this.currentUpload.name;

      localStorage.setItem("urlGambar", this.urlGambar);
      localStorage.setItem("namaGambar", this.namaGambar);
    });
  }

  private saveFileData(upload: Upload) {
    this.afs.list(`${this.basePath}/`).push(upload);
  }
}

