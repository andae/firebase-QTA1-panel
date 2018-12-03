import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
const swal = require('sweetalert');

@Component({
  selector: 'app-penyuluhan-mitra',
  templateUrl: './penyuluhan-mitra.component.html',
  styleUrls: ['./penyuluhan-mitra.component.scss']
})
export class PenyuluhanMitraComponent {
	
	public mitrasColl:AngularFireList<any>;
  	public codemitrasDoc:AngularFireObject<any>;
  	public codemitrasObservable:Observable<any>;

  	codemitraList: any[] = [];

  	constructor(public afs:AngularFireDatabase, public router: Router, 
  		public toastr: ToastrService) {
  	}

    updatePenyuluhanMitra(key) {
      this.router.navigate(['/bimteks/update-mitra', key]);
    }

  	ngOnInit() {
  		this.getCodemitraDetailList();
  	}

    deletePenyuluhanMitra(key) {
      swal({
        title: 'Apa anda yakin?',
        text: 'Apa anda akan menghapus mitra berikut?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Tidak, batal!',
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        if (isConfirm) { 

           this.codemitrasDoc = this.afs.object('bimtekmitra/'+ key);
             this.codemitrasDoc.remove().then(res=>{
              swal('Dihapus!', 'Mitra bimtek berhasil dihapus!.', 'success');
                  
            });            

        } else {
          swal('Dibatalkan', 'Mitra bimtek anda aman :)', 'error');
        }
      });
  }

  	getCodemitraDetailList() {
  		this.mitrasColl = this.afs.list('bimtekmitra', ref => {
	  		return ref.orderByChild("date");
	  	});

	  	this.codemitrasObservable = this.mitrasColl.snapshotChanges().map(actions => {
	      return actions.map(c => ({ id: c.payload.key, ...c.payload.val() }));
	    });

	    this.codemitrasObservable.subscribe((response:any)=>{
	    	this.codemitraList = response.reverse();
	    })
  	}
}
