import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from "lodash";

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
declare var $: any;
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

import { Upload } from '../../menu-items/upload';
import { UploadLelangService } from '../upload-lelang.service';

@Component({
  selector: 'app-editing-image',
  templateUrl: './editing-image.component.html',
  styleUrls: ['./editing-image.component.scss']
})
export class EditingImageComponent implements OnInit {

  menusItems: any = {};
  public itemsDocData: AngularFireObject<any>;
  public itemsObjectObservable: Observable<any>;

  gambarBesar: any;
  gambarKecil: any;

  selectedFiles: FileList;
  currentUpload: Upload;

  currentUploadKecil: Upload;
  selectedFilesKecil: FileList;

  namaGambarBesar;
  namaGambarKecil;

  menuItemsdataRef: AngularFireObject<any>;

  public urlGambarBesar;
  public urlGambarKecil;
  
  public taskBesar;
  public taskKecil;
  
  private basePath: string = '/produkLelang';
  keyGambarBesar;
  keygambarKecil;

  namaGambarLastBesar;
  namaGambarLastKecil;

  constructor(public activatedRoute: ActivatedRoute, public af: AngularFireDatabase,
  	private route: ActivatedRoute, public router: Router, private uploadLelangService: UploadLelangService) { 

  	this.route.params.map(params => params["id"]).subscribe((id) => {
  		if(id != null) {
  			this.menuItemsdataRef = this.af.object('/menusItems/' + id);
  		}
  	});
  }

  ngOnInit() {
  	this.activatedRoute.params.map(params => params['id']).subscribe((menukey) => {
  		if(menukey != null) {
  			this.itemsDocData = this.af.object('menusItems/' + menukey);
  			this.itemsObjectObservable = this.itemsDocData.valueChanges();

  			console.log("menukey => " + menukey);

  			this.itemsObjectObservable.subscribe(res => {
  				if(res != null) {
  					this.menusItems = res;
  					this.gambarBesar = res.urlGambarBesar;
  					this.gambarKecil = res.urlGambarKecil;

            this.namaGambarLastBesar = res.namaGambarBesar;
            this.namaGambarLastKecil = res.namaGambarKecil;
  				}
  			});
  		}
  	});
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
      });
  }

  private saveFileData(upload: Upload) {
   this.af.list(`${this.basePath}/`).push(upload);
  }

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

  simpanGambar() {
      console.log("simpan urlGambarBesar:: " + this.urlGambarBesar);      
      console.log("simpan urlGambarKecil:: " + this.urlGambarKecil);

      if(this.urlGambarBesar != undefined && this.urlGambarKecil != undefined) {
      	  this.uploadLelangService.deleteUploadSingle(this.namaGambarLastBesar);
          this.uploadLelangService.deleteUploadSingle(this.namaGambarLastKecil);

          this.menuItemsdataRef.update({
        		urlGambarBesar: this.urlGambarBesar,
	            namaGambarBesar: this.namaGambarBesar,
	  	      	urlGambarKecil: this.urlGambarKecil,
	            namaGambarKecil: this.namaGambarKecil
		    }).then((res) => {
		    	this.router.navigate(['/menus/manageItems']);
		    });
      } else if(this.urlGambarBesar != undefined) {
        this.uploadLelangService.deleteUploadSingle(this.namaGambarLastBesar);

      	console.log("!undefined besar");
      	this.menuItemsdataRef.update({
      		urlGambarBesar: this.urlGambarBesar,
          	namaGambarBesar: this.namaGambarBesar
	      }).then((res) => {
	        this.router.navigate(['/menus/manageItems']);
	      });

      } else if(this.urlGambarKecil != undefined) {
        this.uploadLelangService.deleteUploadSingle(this.namaGambarLastKecil);
        
      	console.log("!undefined kecil");
      	this.menuItemsdataRef.update({
	        urlGambarKecil: this.urlGambarKecil,
          	namaGambarKecil: this.namaGambarKecil
	      }).then((res) => {
	        this.router.navigate(['/menus/manageItems']);
	      });
	    
      } else {
      	console.log("undefined besar & kecil");
      	this.router.navigate(['/menus/manageItems']);
      }
  }

  cancel(){
    this.router.navigate(['/menus/manageItems']);
  }

}
