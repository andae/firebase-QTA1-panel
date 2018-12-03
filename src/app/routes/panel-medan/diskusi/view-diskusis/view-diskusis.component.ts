import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
const swal = require('sweetalert');
import * as firebase from 'firebase';

@Component({
  selector: 'app-view-diskusis',
  templateUrl: './view-diskusis.component.html',
  styleUrls: ['./view-diskusis.component.scss']
})
export class ViewDiskusisComponent implements OnInit {

  Id: string;
  news: any = {};
  totalComments: number;

  selectedNewsComments: any[] = [];
  commentList: any = [];
 
  public newsDoc:AngularFireObject<any>;
  public newsObservable:Observable<any>;
  public commentDoc:AngularFireObject<any>;
  public commentObservable:Observable<any>;

  public commentsDoc: AngularFireObject<any>;


  constructor( public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute,
    public db: AngularFireDatabase) {

    this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
      if (Id != null) {
    
         this.newsDoc = afs.object('Diskusis/'+Id);
         this.newsObservable = this.newsDoc.valueChanges();
         this.newsObservable.subscribe(response=>{
           this.news = response;
         })


         // this.commentDoc = afs.object('diskusicomments/'+Id);
         // this.commentObservable = this.commentDoc.valueChanges();
         // this.commentObservable.subscribe(response=>{
         //   this.selectedNewsComments = response;
         //   if(response!=null) {
         //     this.totalComments = this.selectedNewsComments.length;
         //   } else {
         //   }
         // })

        this.db.list('/Diskusis/' + Id + '/comments').snapshotChanges().subscribe(res => {
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
       
        this.commentsDoc = this.afs.object('Diskusis/' + Id + '/comments/' + key);
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
