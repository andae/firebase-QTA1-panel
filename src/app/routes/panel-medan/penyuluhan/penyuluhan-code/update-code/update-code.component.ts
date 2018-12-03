import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-code',
  templateUrl: './update-code.component.html',
  styleUrls: ['./update-code.component.scss']
})
export class UpdateCodeComponent implements OnInit {

  public codemitraDoc: AngularFireObject<any>;
  public penyuluhancodeData:Observable<any>;
  penyuluhanCodeDetail: any = {};

  constructor(public afs:AngularFireDatabase, private route: ActivatedRoute,
  	public router: Router, public toasterService: ToastrService) {

  	this.route.params.map(params => params['id']).subscribe((Id) => {
  		if(Id != null) {
  			this.codemitraDoc = afs.object('bimtekKodeBank/' + Id);
  			this.penyuluhancodeData = this.codemitraDoc.valueChanges();
  			this.penyuluhancodeData.subscribe((response) => {
  				this.penyuluhanCodeDetail = response;
  			});
  		} else {

  		}
  	})
  }

  ngOnInit() {
  }

  updateCodeMitra(ngform: NgForm) {
  	this.codemitraDoc.update(this.penyuluhanCodeDetail).then(res => {
  		this.toasterService.success('Kode Bank berhasil ditambah!', 'Success!');
      	this.router.navigate(['/bimteks/codemitra']);
  	}).catch(error => {
  		this.toasterService.error('Terjadi error!', 'Error!');
  	})
  }

}
