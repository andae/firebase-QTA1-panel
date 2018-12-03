import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import {Router} from '@angular/router';
const swal = require('sweetalert');

@Component({
  selector: 'app-mitras',
  templateUrl: './mitras.component.html',
  styleUrls: ['./mitras.component.scss']
})
export class MitrasComponent {

  users:Array<any>;
  usersDataRef:AngularFireList<any>;
  userObservable:Observable<any>;

  constructor(public af: AngularFireDatabase, public router: Router ) {

    this.usersDataRef = af.list('/users', ref => 
        ref.orderByChild('role').equalTo('Mitra'));

  	// this.usersDataRef = af.list('/users');
    this.userObservable = this.usersDataRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  	
    this.userObservable.subscribe((res)=>{
  		this.users = res;
  	})
   }

  usersShow(key){
     this.router.navigate(['/mitras/viewMitra', key]);
  }

  usersEdit(key) {
    this.router.navigate(['/mitras/editPendanaan', key]);
  }

  usersCreate(key) {
    this.router.navigate(['/mitras/createPendanaan', key]);
  }

   usersDelete(key:any){
    swal({
            title: 'Anda Yakin ?',
            text: 'Anda tidak dapat memulihkan kembali !',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Tidak, Batal!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, (isConfirm) => {
            if (isConfirm) {
               this.usersDataRef.remove(key).then((res)=>{
                   swal('Dihapus!','Mitra Berhasil dihapus !', 'success');
                 })
              } else {
                swal('Dibatalkan', 'Data anda masih tersimpan :)', 'error');
            }
        });
  }

}
