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

import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-update-diskusis',
  templateUrl: './update-diskusis.component.html',
  styleUrls: ['./update-diskusis.component.scss']
})
export class UpdateDiskusisComponent implements OnInit, OnDestroy {

  public dataUploading: number;
  news:any = { };

  gambarDiskusi: any = this.news.thumb;
  namaDiskusi;

  selectedFiles: FileList;
  currentUpload: Upload;
  taskArtikel;
  private basePath: string = '/diskusis';
  namaGambar;
  urlGambar;

  date: any;
  imageId: string;
  addNews: FormGroup;
  imageRef = 0;
  categoriesList: any[] = [];
  description:any;
  Id: string;
  public selectedCat:boolean;
 
  public CatCollList:AngularFireList<any>;
  public newsDocData:AngularFireObject<any>;
  public newsObjectObservable:Observable<any>;
  public catListObservable:Observable<any>;

  constructor(public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute, 
    public router: Router, private element: ElementRef, public toastr: ToastrService) { }

  ngOnInit() {
    this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
      if (Id != null) {
         this.newsDocData = this.afs.object('Diskusis/'+Id);
         this.newsObjectObservable = this.newsDocData.valueChanges();
         this.newsObjectObservable.subscribe(res=>{
           if(res != null){
              this.news = res;
              this.gambarDiskusi = res.thumb;
              this.namaDiskusi = res.namaGambar;
           }
          
           $('#summernote').summernote('code', this.news.description);
         })

         this.CatCollList = this.afs.list('diskusikategori');
         this.catListObservable = this.CatCollList.valueChanges();
         this.catListObservable.subscribe(res=>{
           this.categoriesList = res;
         })
      }
     });

    $('#summernote').on('summernote.change', function(we, contents, $editable) {       
        localStorage.setItem('diskusicontents',contents)
      });
  }

  updateNews(form: NgForm) {
    this.date = Date.now();

    if(this.gambarDiskusi == undefined) {
      this.newsDocData.update({
        category: this.news.category,
        categoryId: this.news.categoryId,
        description: this.news.description,
        shortDescription: this.news.shortDescription,      
        title: this.news.title,
        date: this.date
      }).then(res => {
        this.nextTo();
      }).catch(error=>{
        this.toastr.warning('Diskusi tidak di update !', 'Warning!');
      })
    } else {
      this.deleteUploadSingle(this.namaDiskusi);

      let that = this;
      that.newsDocData.update({
        category: that.news.category,
        categoryId: that.news.categoryId,
        shortDescription: that.news.shortDescription,
        thumb: that.urlGambar,
        namaGambar: that.namaGambar,
        title: that.news.title,
        date: that.date
      }).then(response => {
        this.nextTo();
      }).catch(error => {
        this.toastr.warning('News Not updated !', 'Warning!');
      });
    }
  }

  deleteUploadSingle(namaGambar) {
    this.deleteFileStorage(namaGambar);
  }

  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

  nextTo() {
    this.newsObjectObservable.subscribe().unsubscribe();
    this.toastr.info('Diskusi berhasil di update!', 'Success!');
    this.router.navigate(['/diskusis/manageDiskusis']);
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
          this.gambarDiskusi = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
  }

  editUploadArtikel() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.currentUpload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      this.currentUpload.ukuran = uploadTask.snapshot.totalBytes;

      this.taskArtikel = uploadTask;
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
    this.afs.list(`${this.basePath}/`).push(upload);
  }

  ngOnDestroy(){
    this.newsObjectObservable.subscribe().unsubscribe();
    this.catListObservable.subscribe().unsubscribe();
  }
}