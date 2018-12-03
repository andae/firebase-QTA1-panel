import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
declare var $: any;

import { CatlelangService } from '../catlelang.service';
import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-edit-catlelang',
  templateUrl: './edit-catlelang.component.html',
  styleUrls: ['./edit-catlelang.component.scss']
})
export class EditCatlelangComponent {

  catLelangDetails: any = {};

  gambarKategori : any= this.catLelangDetails.thumb;
  namaGambarKategori;

  selectedFiles: FileList;
  currentUpload: Upload;

  private basePath: string = '/catlelangProduck';
  private webBasePath: string = '/categories';

  public taskLelang;
  namaGambar;
  urlGambar;
  
  public categoriesdataRef: AngularFireObject<any>;
  public categoryObjectObservable: Observable<any>;

  constructor(private route: ActivatedRoute,  public router: Router, public af: AngularFireDatabase,
    public toastr: ToastrService, public catlelangService: CatlelangService) {
    
    this.route.params.map(params => params['id']).subscribe((Id) => {
       if(Id != null) {
        this.categoriesdataRef = this.af.object('/catlelang/' + Id);
        this.af.object('/catlelang/' + Id).valueChanges().subscribe((response) => { 
          this.catLelangDetails = response;
        })
      }
    });
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((Id) => {
        if(Id != null) {
          this.categoriesdataRef = this.af.object('catlelang/' + Id);
          this.categoryObjectObservable = this.categoriesdataRef.valueChanges();

          this.categoryObjectObservable.subscribe(res => {
            if(res != null) {
              this.catLelangDetails = res;
              this.gambarKategori = res.thumb;
              this.namaGambarKategori = res.namaGambar;
            }
          })
        }
      });
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

  editUploadLelangKategori() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      this.currentUpload.ukuran = uploadTask.snapshot.totalBytes;

      this.taskLelang = uploadTask;
    }, (err) => {
      console.log("pesan err pada edit kategori: " + err);
    }, () => {
      this.currentUpload.url = uploadTask.snapshot.downloadURL
      this.currentUpload.name = this.currentUpload.file.name
      this.saveFileData(this.currentUpload);

      this.namaGambar = this.currentUpload.name;
      this.urlGambar = this.currentUpload.url;
      console.log("this.urlGambarBesar:: " + this.namaGambar);
    });
  }

  private saveFileData(upload: Upload) {
    this.af.list(`${this.basePath}/`).push(upload);
  }

  gotoRouter() {
    this.router.navigate(['/catlelang/manageCatlelang']);
    this.toastr.success('Categories Data Updated Successfully!', 'Success!');
  }

  onSubmitCategory(form: NgForm) {
    if(this.urlGambar == undefined) {
      this.categoriesdataRef.update({
        title: this.catLelangDetails.title,
        description: this.catLelangDetails.description
      }).then((res) => {
        this.gotoRouter();
      });
    } else {
      this.catlelangService.deleteUploadSingle(this.namaGambarKategori);

      this.categoriesdataRef.update({
        thumb: this.urlGambar,
        namaGambar: this.namaGambar,
        title: this.catLelangDetails.title,
        description: this.catLelangDetails.description
      }).then((res) => {
        this.gotoRouter();
      });
    }
  }
    
  cancel(){
    this.router.navigate(['/catlelang/manageCatlelang']);
  }
}