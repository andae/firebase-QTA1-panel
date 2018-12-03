import {Component,} from '@angular/core';
import {AngularFireDatabase, AngularFireList,AngularFireObject} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
const swal = require('sweetalert');
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';


@Component({
  selector: 'app-artikel-kategori',
  templateUrl: './artikel-kategori.component.html',
  styleUrls: ['./artikel-kategori.component.scss']
})
export class ArtikelKategoriComponent {

  public p: any;
  public categories: Array<any>;
  public news:any[]=[];
  public categoryColl:AngularFireList<any>;
  public newsColl:AngularFireList<any>;
  public catDoc:AngularFireObject<any>;
  public catObservable:Observable<any[]>;
  public newsObservable:Observable<any[]>;

  totalLines: number;
  selectedKatArtikel: any[] = [];

  constructor( public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
   
    this.categoryColl = afs.list('kategoriartikel'); //categories
   
    this.catObservable = this.categoryColl.snapshotChanges().map(changes => {
      return changes.map(c => ({ id: c.payload.key, ...c.payload.val() }));
    });
     this.catObservable.subscribe(response=>{
      this.categories = response;     
    })

     let line = this.categoryColl.valueChanges();
     line.subscribe(res => {
       this.selectedKatArtikel = res;
       if(res != null) {
         this.totalLines = this.selectedKatArtikel.length;
       }
     });
  }

  categoryShow(key) {
  	this.router.navigate(['/artikelkategoris/viewArtikelkategori', key]);
  }


  deleteCategory(key) {
    swal({
      title: 'apa anda yakin?',
      text: 'Apa anda ingin menghapus kategori artikel berikut!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Batal!',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if (isConfirm) { 

         this.catDoc = this.afs.object('kategoriartikel/'+key);
           this.catDoc.remove().then(res=>{
            swal('Dihapus!', 'File anda berhasil di hapus.', 'success');
                
          });
           
      } else {
        swal('Dibatalkan', 'File anda masih tersimpan :)', 'error');
      }
    });
  }

  updateCategory(key) {
    this.router.navigate(['/artikelkategoris/updateKategoriartikel', key]);
  }

}
