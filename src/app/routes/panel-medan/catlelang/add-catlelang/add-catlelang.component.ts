import { Component } from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';
import * as firebase from 'firebase';
declare var $: any;
import {ToastrService} from 'ngx-toastr';

import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-add-catlelang',
  templateUrl: './add-catlelang.component.html',
  styleUrls: ['./add-catlelang.component.scss']
})
export class AddCatlelangComponent  {

  catlelang: any = {
    title: '',
    description: '',
    thumb: null
  }

  gambarKategori: any = "assets/img/dummy.png";
  selectedFiles: FileList;
  currentUpload: Upload;

  private basePath: string = '/catlelangProduck';
  public taskBesar;

  urlGambar;
  namaGambar;

  public catlelangsColl: AngularFireList<any>;

  constructor(public afs: AngularFireDatabase, public router: Router, public toastr: ToastrService) {

    this.catlelangsColl = afs.list('catlelang');
  }

  onAddNews(form: NgForm) {
    var that = this;

    this.urlGambar = localStorage.getItem("urlGambar");
    this.namaGambar = localStorage.getItem("namaGambar");

    that.catlelang.thumb = this.urlGambar;
    that.catlelang.namaGambar = this.namaGambar;

    that.catlelangsColl.push(that.catlelang).then(res => {
      that.toastr.success('Categories Lelang Data Added Successfully!', 'Success!');
      that.router.navigate(['/catlelang/manageCatlelang']);
    }, error => {
      this.toastr.error('error penambahan data!', 'Error!');
    });

    console.log("this.urlGambar --> " + this.urlGambar);
    console.log("this.namaGambar --> " + this.namaGambar);

    localStorage.removeItem("urlGambar");
    localStorage.removeItem("namaGambar");

    // var that = this;
    // let metadata = {
    //   contentType: 'image/*'
    // }
    // let storageRef = firebase.storage().ref();
    // let file = (<HTMLInputElement>document.getElementById('inputFileId')).files[0];
    // let uploadTask = storageRef.child('catlelangProduck/' + file.name).put(file, metadata).then(res => {
    //   storageRef.child('catlelangProduck/' + file.name).getDownloadURL().then(function(url) {
    //     that.catlelang.thumb = url;

    //     if(that.catlelang.thumb != null) {
    //       that.catlelangsColl.push(that.catlelang).then(res => {
    //         that.toastr.success('Categories Lelang Data Added Successfully!', 'Success!');
    //         that.router.navigate(['/catlelang/manageCatlelang']);
    //       }, error => {
    //         this.toastr.error('error penambahan data!', 'Error!');
    //       });
    //     }
    //   });
    // }).catch(error => {
    //   this.toastr.error('error pada upload gambar!', 'error!');
    // });
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

  uploadKategoriLelang() {
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
    
  cancel(){
    this.router.navigate(['/catlelang/manageCatlelang']);
  }
}

