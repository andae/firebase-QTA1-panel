import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as firebase from 'firebase';
declare var $: any;
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-add-artikels',
  templateUrl: './add-artikels.component.html',
  styleUrls: ['./add-artikels.component.scss']
})
export class AddArtikelsComponent implements OnInit {

  public dataUploading: number;

  news :any= {
    title:'',
    shortDescription:'',
    date:0,
    categoryId:'',
    category:'',
    thumb:null,
    namaGambar: ''
  };

  gambarArtikel: any = "assets/img/dummy.png";
  selectedFiles: FileList;
  currentUpload: Upload;
  taskArtikel;

  urlGambar;
  namaGambar;

  // date: any;
  // imageId: string;
  // addNews: FormGroup;
  // imageRef = 0;
  categoriesList: any[] = [];
  public selectedCat:boolean;
 
  public newsColl:AngularFireList<any>;
  public catColl:AngularFireList<any>;
  public catObservable:Observable<any>;

  private basePath: string = '/articles';

  constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {

    this.newsColl = afs.list('Artikels');

    this.catColl = afs.list('kategoriartikel');
    this.catObservable = this.catColl.snapshotChanges().map(actions => {
      return actions.map(c => ({ id: c.payload.key, ...c.payload.val() }));
    });
    this.catObservable.subscribe(res=>{
      this.categoriesList = res;
    })
  }

  ngOnInit() { }

  onAddNews(form: NgForm) {
    var that = this;

    that.news.thumb = localStorage.getItem("urlGambar");
    that.news.namaGambar = localStorage.getItem("namaGambar");

    that.newsColl.push(that.news).then(res => {
      that.toastr.info('Artikel Berhasil Ditambahkan!', 'Success!');
      that.router.navigate(['/artikels/manageArtikels']);
    }, error => {
      this.toastr.error('Error penambahan artikel!', 'Error!');
    });

    console.log("this.urlGambar --> " + this.urlGambar);
    console.log("this.namaGambar --> " + this.namaGambar);

    localStorage.removeItem("urlGambar");
    localStorage.removeItem("namaGambar");
  }

  onSelectedChange(value: any) {
    let id = value.split(".");
    this.news.categoryId = id[1];
    this.news.category = id[0];
    this.selectedCat = true;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.gambarArtikel = event.target.result;
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

      this.taskArtikel = uploadTask;
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
