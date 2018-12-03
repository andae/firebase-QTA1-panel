import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
declare var $: any;

import { CategoryService } from '../category-service.service';
import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  
  categoryDetails: any = {};

  gambarKategori : any= this.categoryDetails.thumb;
  namaGambarKategori;
  
  public categoriesdataRef: AngularFireObject<any>;
  public categoryObjectObservable: Observable<any>;

  selectedFiles: FileList;
  currentUpload: Upload;

  private basePath: string = '/kategoriToko';
  private webBasePath: string = '/categories';

  public taskKategories;

  namaGambar;
  urlGambar;

  constructor(private route: ActivatedRoute,  public router: Router, public af: AngularFireDatabase,
    public toastr: ToastrService, public categoryService: CategoryService) {
  	
    this.route.params.map(params => params['id']).subscribe((Id) => {
  	 	if(Id != null) {
		    this.categoriesdataRef = this.af.object('/categories/' + Id);
        this.af.object('/categories/' + Id).valueChanges().subscribe((response) => { 
          this.categoryDetails = response;
		    })
      }
    });
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe((Id) => {
        if(Id != null) {
          this.categoriesdataRef = this.af.object('categories/' + Id);
          this.categoryObjectObservable = this.categoriesdataRef.valueChanges();

          this.categoryObjectObservable.subscribe(res => {
            if(res != null) {
              this.categoryDetails = res;
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

  editUploadKategori() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      this.currentUpload.ukuran = uploadTask.snapshot.totalBytes;

      this.taskKategories = uploadTask;
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

  toRouter() {
    this.router.navigate(['/categories/manageCategories']);
    this.toastr.success('Categories Data Updated Successfully!', 'Success!');
  }

  onSubmitCategory(form: NgForm) {
    if(this.urlGambar == undefined) {
      this.categoriesdataRef.update({
        title: this.categoryDetails.title,
        description: this.categoryDetails.description
      }).then((res) => {
        this.toRouter();
      });
    } else {
      this.categoryService.deleteUploadSingle(this.namaGambarKategori);
      this.categoriesdataRef.update({
        thumb: this.urlGambar,
        namaGambar: this.namaGambar,
        title: this.categoryDetails.title,
        description: this.categoryDetails.description,
      }).then((res) => {
        this.toRouter();
      });
    }
  }
    
  cancel(){
    this.router.navigate(['/categories/manageCategories']);
  }
}