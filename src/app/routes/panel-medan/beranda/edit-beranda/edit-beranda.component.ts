import {Component, OnInit, ElementRef,OnDestroy} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
declare var $: any;

import { BerandaService } from '../beranda.service';
import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-edit-beranda',
  templateUrl: './edit-beranda.component.html',
  styleUrls: ['./edit-beranda.component.scss']
})
export class EditBerandaComponent implements OnInit {

  news:any = { };

  gambarBeranda: any = this.news.url;
  namaBeranda;
  keyBeranda;

  selectedFiles;
  currentUpload: Upload;
  taskBeranda;

  namaGambar;
  urlGambar;

  private basePath: string = '/berandas';

  public newsDocData:AngularFireObject<any>;
  public newsObjectObservable:Observable<any>;

  constructor( public af:AngularFireDatabase, public activatedRoute: ActivatedRoute,
  	public router: Router, private element: ElementRef,
  	public toastr: ToastrService, public berandaService: BerandaService) {

  }

  ngOnInit() {
    this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
      if(Id != null) {
        this.newsDocData = this.af.object('berandas/'+Id);
        this.newsObjectObservable = this.newsDocData.valueChanges();
        this.newsObjectObservable.subscribe(res => {
          if(res != null) {
            this.news = res;
            this.gambarBeranda = res.url;
            this.namaBeranda = res.name;
            this.keyBeranda = Id;

            console.log("key ==> " + this.keyBeranda);
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
          this.gambarBeranda = event.target.result;
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

      this.taskBeranda = uploadTask;
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

  saveFileData(upload: Upload) {
    this.af.list(`${this.basePath}/`).push(upload);
  }

  simpanGambar() {
    if(this.urlGambar == undefined) {
      this.toastr.info("silahkan centang upload gambar..!");
    } else {

      console.log("this.keyBeranda, this.namaBeranda: " + this.keyBeranda + '  ===  ' + this.namaBeranda);

      this.berandaService.deleteUpload(this.keyBeranda, this.namaBeranda);
      this.toastr.info('beranda Berhasil Ditambahkan!', 'Success!');
      this.router.navigate(['/beranda/manageBeranda']);
    }
  }

  ngOnDestroy(){
    this.newsObjectObservable.subscribe().unsubscribe();
  }

}
