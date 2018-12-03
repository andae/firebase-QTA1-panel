import { Component,OnInit } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase,AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import  {map} from 'rxjs/Operator/map';

import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
const swal = require('sweetalert');

import * as firebase from 'firebase';
declare var $: any;

import { CatlelangService } from './catlelang.service';

@Component({
  selector: 'app-catlelang',
  templateUrl: './catlelang.component.html',
  styleUrls: ['./catlelang.component.scss']
})
export class CatlelangComponent implements OnInit {

  public siteVal:any;
  public catlelang:any[]=[];
  public catRef:AngularFireList<any>;
  public catlelangData: Observable<any>;
  public itemsDocData: AngularFireObject<any>;

  constructor(public af:AngularFireDatabase, public router:Router, public toastr: ToastrService,
    public catlelangService: CatlelangService) {

    this.catRef= this.af.list('/catlelang');
     this.catlelangData = this.catRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    
    this.catlelangData.subscribe((res)=>{     
      this.catlelang = res;
    }); 
  }

  getCatlelang(ev: any) {
    let val = ev;     
    this.catlelangData = this.af.list('/catlelang',ref => ref.orderByChild('title')
      .startAt(val.charAt(0).toUpperCase() + val.slice(1))
      .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).snapshotChanges().map(res => {
        return res.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
        
    this.catlelangData.subscribe((data) => {
      if(data.length != 0) {
        this.catlelang = data;
      } else {
        this.toastr.warning('Data tidak tersedia !', 'warning!');
      }
    });
  }

  catlelangShow(key){
    this.router.navigate(['/catlelang/viewCatlelang', key]);
  }
  
  catlelangEdit(key){
    this.router.navigate(['/catlelang/editCatlelang', key]);
  }

  catlelangDelete(key:any, namaGambar){
    swal({
            title: 'Are you sure?',
            text: 'Your will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, (isConfirm) => {
          
            if(isConfirm) {
              console.log("namaGambar deleted!, " + namaGambar);
              this.catlelangService.deleteUpload(key, namaGambar);
              swal('Dihapus!','Kategori Lelang berhasil dihapus!', 'success');
            } else {
              swal('Dibatalkan', 'Data anda masih tersimpan :)', 'error');
            }
        });
  }

  ngOnInit(){
  
  }
}
