import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-update-mitra-id',
  templateUrl: './update-mitra-id.component.html',
  styleUrls: ['./update-mitra-id.component.scss']
})
export class UpdateMitraIdComponent implements OnInit {

  public mitraIdDoc: AngularFireObject<any>;
  	public mitraIdData:Observable<any>;
  	mitraIdDetail: any = {};

  	userList: any = [];

  	constructor(public afs:AngularFireDatabase, private route: ActivatedRoute,
  		public router: Router, public toasterService: ToastrService, 
  		private _location: Location, public toastr: ToastrService) {

  		this.route.params.map(params => params['id']).subscribe((Id) => {
  			if(Id != null) {
  				this.mitraIdDoc = afs.object('/users/' + Id);
  				this.mitraIdData = this.mitraIdDoc.valueChanges();
  				this.mitraIdData.subscribe((res) => {
  					this.mitraIdDetail = res;
  				});
  			} else { }

      afs.list('/users/daftarMitra').snapshotChanges().subscribe(res => {
           this.daftarMitra = [];
           res.forEach(item => {
             let temp = item.payload.toJSON();
             temp['$key'] = item.payload.key;
             this.daftarMitra.push(temp);
           });
         });

  		})
  	}

    daftarMitra: any = [];

  	ngOnInit() {
  	}

  	updateIdMitra(ngForm: NgForm) {

      // this.mitraIdDetail.isId = true;
      // console.log("idnumber: " + this.daftarMitra.length);
      // this.mitraIdDetail.idnumber = this.daftarMitra.length;

  		this.mitraIdDoc.update(this.mitraIdDetail).then(res => {
  			this.toasterService.success('Id Mitra berhasil ditambah!', 'Success!');
  			this._location.back();
  		}).catch(error => {
  			this.toasterService.error('Terjadi error!', 'Error!');
  		})
  	}

  	backClicked() {
  		this._location.back();
  	}

}
