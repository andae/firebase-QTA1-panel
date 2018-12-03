import {Component,} from '@angular/core';
import {AngularFireDatabase, AngularFireList,AngularFireObject} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
const swal = require('sweetalert');
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

@Component({
  selector: 'app-diskusi-kategori',
  templateUrl: './diskusi-kategori.component.html',
  styleUrls: ['./diskusi-kategori.component.scss']
})
export class DiskusiKategoriComponent {

  public p: any;
  public categories: Array<any>;
  public news:any[]=[];
  public categoryColl:AngularFireList<any>;
  public newsColl:AngularFireList<any>;
  public catDoc:AngularFireObject<any>;
  public catObservable:Observable<any[]>;
  public newsObservable:Observable<any[]>;

  constructor( public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
   
    this.categoryColl = afs.list('diskusikategori');
   
    this.catObservable = this.categoryColl.snapshotChanges().map(changes => {
      return changes.map(c => ({ id: c.payload.key, ...c.payload.val() }));
    });
     this.catObservable.subscribe(response=>{
      this.categories = response;
     
    })
  }


  categoryShow(key) {
    this.router.navigate(['/diskusikategori/viewCategory', key]);
  }

  deleteCategory(key) {
    swal({
      title: 'Apa anda yakin?',
      text: 'Apa anda akan menghapus kategori diskusi berikut?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batal!',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if (isConfirm) { 

         this.catDoc = this.afs.object('diskusikategori/'+key);
           this.catDoc.remove().then(res=>{
            swal('Dihapus!', 'Kategori diskusi anda dihapus!.', 'success');
                
          });            

      } else {
        swal('Dibatalkan', 'Kategori diskusi anda aman :)', 'error');
      }
    });
  }

  updateCategory(key) {
   this.router.navigate(['/diskusikategoris/updateKategoridiskusi', key]);
  }

}
