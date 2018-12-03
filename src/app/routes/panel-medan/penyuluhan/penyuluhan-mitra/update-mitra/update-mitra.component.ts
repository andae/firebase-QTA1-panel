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

@Component({
  selector: 'app-update-mitra',
  templateUrl: './update-mitra.component.html',
  styleUrls: ['./update-mitra.component.scss']
})
export class UpdateMitraComponent implements OnInit {

  public dataUploading: number;
  news:any = { };

  url: any = this.news.thumb;


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

  constructor( public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute,
    public router: Router, private element: ElementRef,
    public toastr: ToastrService) { }

  updateNews(form: NgForm) {
    this.date = Date.now();

    this.newsDocData.update({
        codemitra: this.news.codemitra,
        namamitra: this.news.namamitra,
        date: this.date
      }).then(res => {
        this.newsObjectObservable.subscribe().unsubscribe();
             this.toastr.info('Bimtek berhasil diperbaharui!', 'Success!');
            this.router.navigate(['/bimteks/mitra']);
      }).catch(error => {
        this.toastr.warning('Bimtek Belum diupdate!', 'Warning');
      })
  }

  onSelectedChange(value: any) {
    let id = value.split();
    this.news.codemitra = id[0];
    this.selectedCat = true;
  }

  ngOnInit() {
    this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
      if(Id != null) {
        this.newsDocData = this.afs.object('bimtekmitra/'+Id);
           this.newsObjectObservable = this.newsDocData.valueChanges();

           this.newsObjectObservable.subscribe(res => {
             if(res != null) {
               this.news = res;
               this.url = res.thumb;
             }
           })

           this.CatCollList = this.afs.list('bimtekKodeBank');

           this.catListObservable = this.CatCollList.snapshotChanges().map(actions => {
             return actions.map(c => ({
               id: c.payload.key,
               ...c.payload.val()
             }));
           })
           // this.catListObservable = this.CatCollList.valueChanges();
           this.catListObservable.subscribe(res=>{
               this.categoriesList = res.reverse();
           })
      }
    });
  }

  ngOnDestroy(){
    this.newsObjectObservable.subscribe().unsubscribe();
    this.catListObservable.subscribe().unsubscribe();
  }
}
