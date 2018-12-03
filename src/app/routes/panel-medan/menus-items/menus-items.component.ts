import { Component, OnInit } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import { ToastrService } from 'ngx-toastr';
const swal = require('sweetalert');

import { UploadLelangService } from './upload-lelang.service';

@Component({
  selector: 'app-menus-items',
  templateUrl: './menus-items.component.html',
  styleUrls: ['./menus-items.component.scss']
})
export class MenusItemsComponent implements OnInit {

    siteVal:any;
    menusItems: any;
    menusItemsDataRef: AngularFireList<any>;
    menusObservable:Observable<any>;
    
    constructor(public af:AngularFireDatabase, public router:Router,public toastr: ToastrService,
      private uploadLelangService: UploadLelangService) {

      this.menusItemsDataRef = af.list('/menusItems');
      this.menusObservable = this.menusItemsDataRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      this.menusObservable.subscribe((res) => {
        this.menusItems = res;
      });
    }

  ngOnInit() { }

  getMenulelangs(ev: any) {
      let val = ev;
      this.menusObservable = this.af.list('/menusItems',ref => ref.orderByChild('title').startAt(val.charAt(0).toUpperCase() + val.slice(1))
        .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).snapshotChanges().map(ch => {
        
        return ch.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
        
      this.menusObservable.subscribe((data) => {
        if(data.length != 0) {
          this.menusItems = data;
        } else {
          this.toastr.warning('Data tidak tersedia !', 'warning!');
        }
      });
  }

  menusLelangShow(key){
   this.router.navigate(['/menus/viewItems', key]);
  }
  
  menusLelangEdit(key){
    this.router.navigate(['/menus/editItems', key]);
  }

  menusItemWinner(key) {
    this.router.navigate(['/menus/winnerItems', key]);
  }
 
  menusLelangDelete(key:any, namaGambarBesar, namaGambarKecil) {
    swal({
      title: 'Are you sure?',
      text: 'Your will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if(isConfirm) {

        console.log("namaGambarBesar deleted!, " + namaGambarBesar);
        console.log("namaGambarKecil deleted!, " + namaGambarKecil);
        
        this.uploadLelangService.deleteUpload(key, namaGambarBesar, namaGambarKecil);
        swal('Dihapus!','Lelang berhasil dihapus!', 'success');
      } else {
        swal('Dibatalkan', 'Data anda masih tersimpan :)', 'error');
      }
    });
  }
}
