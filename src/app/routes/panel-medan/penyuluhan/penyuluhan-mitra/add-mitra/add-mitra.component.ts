import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-add-mitra',
  templateUrl: './add-mitra.component.html',
  styleUrls: ['./add-mitra.component.scss']
})
export class AddPenyuluhanMitraComponent implements OnInit {

	  PenyuluhanMitra: FormGroup;
  	date: any;

    penyuluhanmitra : any = {
      namamitra: '',
      codemitra: '',
      date: ''
    };

    codeMitraList: any[] = [];
  	
  	public penyuluhanMitraColl:AngularFireList<any>;

    public codemitraColl:AngularFireList<any>;
    public codemitraObservable:Observable<any>;

  	constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {

  		this.penyuluhanMitraColl = afs.list('bimtekmitra');

      this.codemitraColl = afs.list("bimtekKodeBank");
      this.codemitraObservable = this.codemitraColl.snapshotChanges().map(actions => {
        return actions.map(c => ({
          id: c.payload.key,
          ...c.payload.val()
        }));
      });
      this.codemitraObservable.subscribe(res => {
        this.codeMitraList = res;
      })
  	}

    onSelectedChange(value: any) {
      let id = value.split();
      this.penyuluhanmitra.codemitra = id[0];
    }

  	tambahPenyuluhanMitra(ngform: NgForm) {
  		this.date = Date.now();
      this.penyuluhanmitra.date = Date.now();
      this.penyuluhanmitra.namamitra = this.PenyuluhanMitra.value.namamitra;

  		// let penyuluhanMitra: any = {
  		// 	namamitra: this.PenyuluhanMitra.value.namamitra,
  		// 	date: this.date
  		// }

  		this.penyuluhanMitraColl.push(this.penyuluhanmitra).then(res => {
  			this.toastr.success('Bimtek Mitra berhasil ditambahkan.', 'Success');
  			this.router.navigate(['/bimteks/mitra']);
  		}, error => {
  			this.toastr.error('Terjadi kesalahan pada penambahan bimtek mitra!', 'Error');
  		})
  	}

  	ngOnInit() {
  		this.PenyuluhanMitra = new FormGroup({
  			'namamitra': new FormControl('', Validators.required)
  		})
  	}

}
