import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-update-profile-mitra',
  templateUrl: './update-profile-mitra.component.html',
  styleUrls: ['./update-profile-mitra.component.scss']
})
export class UpdateProfileMitraComponent implements OnInit {

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
  		})
  	}

    daftarMitra: any = [];

  	ngOnInit() {
  	}

  	updateProfileMitra(ngForm: NgForm) {

  		this.mitraIdDoc.update(this.mitraIdDetail).then(res => {
  			this.toasterService.success('Koordinat Rumah Mitra berhasil ditambah!', 'Success!');
  			this._location.back();
  		}).catch(error => {
  			this.toasterService.error('Terjadi error!', 'Error!');
  		})
  	}

  	backClicked() {
  		this._location.back();
  	}

}
