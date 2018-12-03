import { Component, OnInit } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import { ToastrService } from 'ngx-toastr';
const swal = require('sweetalert');

import { UploadService } from './upload.service';

import * as firebase from 'firebase';
declare var $: any;

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  siteVal:any;
  menuItems:Array<any>;
  menuItemsDataRef: AngularFireList<any>;
  menuObservable:Observable<any>;
  
  constructor(public af:AngularFireDatabase, public router:Router,public toastr: ToastrService,
    public uploadService: UploadService) {
      this.menuItemsDataRef = af.list('/menuItems');
      this.menuObservable = this.menuItemsDataRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
         this.menuObservable.subscribe((res)=>{
         this.menuItems = res;
     });
  }

  ngOnInit() { }

  getMenuTokos(ev: any) {

    console.log("ev --->" + ev);
      let val = ev;
      this.menuObservable = this.af.list('/menuItems',ref => ref.orderByChild('title').startAt(val.charAt(0).toUpperCase() + val.slice(1))
        .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).snapshotChanges().map(ch => {
        
        return ch.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
        
      this.menuObservable.subscribe((data) => {
        if(data.length != 0) {
          this.menuItems = data;

          console.log("menuItems: --> " + this.menuItems);
        } else {
          this.toastr.warning('Data tidak tersedia !', 'warning!');
        }
      });
  }
  
  menuItemShow(key){
     this.router.navigate(['/menu/viewItems', key]);
  }
  
  menuItemEdit(key){
    this.router.navigate(['/menu/editItems', key]);
  }
  
  menuItemDelete(key:any, namaGambarBesar, namaGambarKecil) {
    swal({
            title: 'Apa Anda Yakin?',
            text: 'Apakah anda ingin menghapus produk berikut!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Tidak, batal!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, (isConfirm) => {

            if(isConfirm) {
              this.uploadService.deleteUpload(key, namaGambarBesar, namaGambarKecil);
              swal('Dihapus!','produk berhasil dihapus!', 'success');
            } else {
              swal('Dibatalkan', 'Data anda masih tersimpan :)', 'error');
            }
        });
  }

}
