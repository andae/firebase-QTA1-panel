import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireObject, AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/Operator/map';

import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
const swal = require('sweetalert');

import * as firebase from 'firebase';
declare var $: any;

import { CategoryService } from './category-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public siteVal:any;
  public categories:any[]=[];
  public catRef:AngularFireList<any>;
  public categoryData: Observable<any>;
  public itemsDocData: AngularFireObject<any>;

  public url;

  constructor(public af:AngularFireDatabase, public router:Router, public toastr: ToastrService, 
    public categoryService: CategoryService) {

    this.catRef= this.af.list('/categories');
    this.categoryData = this.catRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.categoryData.subscribe((res)=>{     
      this.categories = res;
    }); 
  }

  getCategory(ev: any) {
    let val = ev;   
    this.categoryData = this.af.list('/categories',ref => ref.orderByChild('title')
      .startAt(val.charAt(0).toUpperCase() + val.slice(1))
      .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).snapshotChanges().map(res => {

        return res.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
        
    this.categoryData.subscribe((data) => {
      if(data.length != 0) {
        this.categories = data;
      } else {
        this.toastr.warning('Data tidak tersedia !', 'warning!');
      }
    });
  }
 
  categoryShow(key){
    this.router.navigate(['/categories/viewCategory', key]);
  }
  
   categoryEdit(key){
    this.router.navigate(['/categories/editCategory', key]);
  }

  categoryDelete(key:any, namaGambar){
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
              this.categoryService.deleteUpload(key, namaGambar);
              swal('Dihapus!','Kategori Toko berhasil dihapus!', 'success');
            } else {
              swal('Dibatalkan', 'Data anda masih tersimpan :)', 'error');
            }
        });
  }

  ngOnInit() { }
}
