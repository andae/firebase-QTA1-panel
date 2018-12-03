import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import {ToastrService} from 'ngx-toastr';
const swal = require('sweetalert');
import * as firebase from 'firebase';


@Component({
  selector: 'app-view-artikels',
  templateUrl: './view-artikels.component.html',
  styleUrls: ['./view-artikels.component.scss']
})
export class ViewArtikelsComponent implements OnInit {

  Id: string;
  news: any = {};
  totalComments: number;

  selectedNewsComments: any[] = [];
 
  public newsDoc:AngularFireObject<any>;
  public newsObservable:Observable<any>;
  public commentDoc:AngularFireObject<any>;
  public commentObservable:Observable<any>;

  commentList: any = [];

  constructor( public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute,
    public db: AngularFireDatabase, public toastr: ToastrService) {

    this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
      if (Id != null) {
    
         this.newsDoc = afs.object('Artikels/'+Id);
         this.newsObservable = this.newsDoc.valueChanges();
         this.newsObservable.subscribe(response=>{
           this.news = response;
         })
         // this.commentDoc = afs.object('Artikels/'+ Id + '/comments/');
         // this.commentObservable = this.commentDoc.valueChanges();
         // this.commentObservable.subscribe(response => {
         //   this.selectedNewsComments = response;
         //   if(response!=null){
         //     this.totalComments = this.selectedNewsComments.length;
         //     console.log('total: ' + this.totalComments);
         //   }else{
         //   }
         // })

         this.db.list('/Artikels/' + Id + '/comments').snapshotChanges().subscribe(res => {
           this.commentList = [];
           res.forEach(item => {
             let temp = item.payload.toJSON();
             temp['$key'] = item.payload.key;
             this.commentList.push(temp);
           });
         });
      }
    })
  }

  public commentsDoc: AngularFireObject<any>;

  // removeComment(key) {

  //   this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {

  //     this.commentsDoc = this.db.object('Artikels/' + Id + '/comments/' + key);

  //     this.commentDoc.remove().then(res => {
  //       this.toastr.info('Komentar Berhasil Dihapus!', 'Success!');
  //     })
  //   })
  // }

  removeComment(key) {
    this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {

      swal({
      title: 'Apa anda yakin?',
      text: 'Anda tidak dapat memperbaharuinya kembali !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batal!',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if (isConfirm) {
        let count =1;
       
        this.commentsDoc = this.afs.object('Artikels/' + Id + '/comments/' + key);
        let Articles:Observable<any> = this.commentsDoc.valueChanges(); 
        Articles.subscribe(res => {

          if(count ==1) {
            count--;
            let dr = firebase.storage().refFromURL(res.thumb);
              
              dr.delete().then(sucess => {
                 this.commentsDoc.remove();           
                 swal('Dihapus!', 'Komentar telah dihapus.', 'success');
              
              }).catch(error => {
              });
            }
        });
      } else {
        swal('Dibatalkan', 'Komentar masih ada :)', 'error');
      }
    });
    })
  }


  ngOnInit() {
  }

}
