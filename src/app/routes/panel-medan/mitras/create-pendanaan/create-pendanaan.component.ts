import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import * as firebase from 'firebase';
declare var $: any;
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

@Component({
  selector: 'app-create-pendanaan',
  templateUrl: './create-pendanaan.component.html',
  styleUrls: ['./create-pendanaan.component.scss']
})
export class CreatePendanaanComponent implements OnInit {

  public catColl:AngularFireList<any>;
  	public catObservable:Observable<any>;

  	pendanaanMitras = {
  		saldo: '',
  		tahapan: [{
        tahappembayaran: '',
        jumlahpembayaran: ''
      }]
  	}

  	ItemPendanaan = [];

  	pendanaanMitrasDataRef: AngularFireList<any>;
	  mitraList: any[] = [];

  userDetails:any={};
  userRef:AngularFireObject<any>;
  userObservable:Observable<any>;

  	constructor(public router: Router, private route: ActivatedRoute, 
      public afs:AngularFireDatabase, public toastr: ToastrService,
  		public af: AngularFireDatabase) {

      this.route.params.map(params => params['id']).subscribe((Id) => {
        if(Id != null) {
          this.userRef =  this.af.object('/users/' + Id);
          this.userObservable = this.userRef.valueChanges();
          this.userObservable.subscribe((response) => { 
              this.userDetails = response;
          })
          // this.pendanaanMitrasDataRef = this.af.list('/users/' +  Id + '/pendanaanMitras'); 0812 6342 2408
        }
      })
  	}

  	ngOnInit() { }

  	addNewTahap = function () {
    	var newItemNo = this.pendanaanMitras.tahapan.length + 1;
    	this.pendanaanMitras.tahapan.push({});
  	};

  	removeTahap = function () {
    	if (this.pendanaanMitras.tahapan.length > 1) {
      		var lastItem = this.pendanaanMitras.tahapan.length - 1;
      		this.pendanaanMitras.tahapan.splice(lastItem);
    	}
  	};

  	onTransferDanaMitra(form: NgForm) {
      this.userRef.update({
        pendanaan: 'benar',
        pendanaanMitra: this.pendanaanMitras,

      }).then(res => {
        this.toastr.success('Menu-Items Data Added Successfully!', 'Success!');
        this.router.navigate(['/mitras/manageMitras']);
      }).catch(error => {
        this.toastr.warning('Artikel Belum diupdate!', 'Warning');
      })	
  	}

  	cancel() {
    	this.router.navigate(['/mitras/manageMitras']);
  	}

}
