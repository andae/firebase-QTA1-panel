import {Component,} from '@angular/core';
import {AngularFireDatabase, AngularFireList,AngularFireObject} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
const swal = require('sweetalert');
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

@Component({
  selector: 'app-penyuluhan-code',
  templateUrl: './penyuluhan-code.component.html',
  styleUrls: ['./penyuluhan-code.component.scss']
})
export class PenyuluhanCodeComponent {

	public penyuluhanCodeColl:AngularFireList<any>;
	public codepenyuluhanObservable:Observable<any[]>;
	public penyDoc:AngularFireObject<any>;

	public penyuluhancodeMitras: Array<any>;

  	constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {

  		this.penyuluhanCodeColl = afs.list('bimtekKodeBank');

  		this.codepenyuluhanObservable = this.penyuluhanCodeColl.snapshotChanges().map(changes => {
  			return changes.map(c => ({
  				id: c.payload.key,
  				...c.payload.val()
  			}));
  		});

  		this.codepenyuluhanObservable.subscribe(response => {
  			this.penyuluhancodeMitras = response;
  		})
  	}

  	ngOnInit() {
  	}

    updateCodeMitra(key) {
      this.router.navigate(['/bimteks/update-codemitra', key]);
    }

  deleteCodeMitra(key) {
      swal({
        title: 'Apa anda yakin?',
        text: 'Apa anda akan menghapus code mitra berikut?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Tidak, batal!',
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        if (isConfirm) { 

           this.penyDoc = this.afs.object('bimtekKodeBank/'+ key);
             this.penyDoc.remove().then(res=>{
              swal('Dihapus!', 'Kode Bank Bimtek berhasil dihapus!.', 'success');
                  
            });            

        } else {
          swal('Dibatalkan', 'Kode Bank Bimtek anda aman :)', 'error');
        }
      });
  }

}
