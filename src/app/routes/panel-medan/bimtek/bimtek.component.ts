import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import {PushNotificationService} from '../push-notification/push-notification.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

const swal = require('sweetalert');

@Component({
  selector: 'app-bimtek',
  templateUrl: './bimtek.component.html',
  styleUrls: ['./bimtek.component.scss'],
  providers: [ PushNotificationService ]
})
export class BimtekComponent implements OnInit {

	bimteksList: any[] = [];
  	items: any[] = [];
  	searchVal:'';
 
  	public bimteksColl: AngularFireList<any>;
  	public bimteksDoc: AngularFireObject<any>;
  	public bimteksObservable: Observable<any>;

  	message: any = {
	    app_id: "614240e3-c369-44a1-82fb-73227bd2c71c",
	    contents: {"en": ''},
	    headings: {"en": ''},
	    included_segments: ["All"]
  	};

  	constructor(public pushNotification: PushNotificationService, public afs:AngularFireDatabase, 
  		public router: Router, public toastr: ToastrService) {

  	}

  	ngOnInit() {
  		this.getBimteksDetailList();
  	}

  	getBimteksDetailList() {
  		this.bimteksColl = this.afs.list('Penyuluhans', ref => {
  			return ref.orderByChild("date");
  		});

  		this.bimteksObservable = this.bimteksColl.snapshotChanges().map(actions => {
  			return actions.map(c => ({
  				id: c.payload.key,
  				...c.payload.val()
  			}));
  		});

  		this.bimteksObservable.subscribe((res: any) => {
  			this.bimteksList = res.reverse();
  		})
  	}

  	sendNotification(index: number) {
    	for (let i = 0; i < this.bimteksList.length; i++) {
	      	if (i == index) {
	        	this.message.headings.en = this.bimteksList[index].title;
	        	this.message.contents.en = this.bimteksList[index].shortDescription;
	        	this.onpushNotification();
	      	}
    	}
  	}

  	onpushNotification() {
	    this.pushNotification.sendNotification(this.message).subscribe(res => {
	      this.toastr.success('Notification Berhasil Dikirim!', 'Success!');
	    })
  	}

  	viewBimteks(key) {
  		this.router.navigate(['/penyuluhans/view-penyuluhan', key])
  	}

  	updateBimteks(key) {
    	this.router.navigate(['/penyuluhans/update-penyuluhan', key]);
  	}

  	deleteBimteks(key,i) {
	    swal({
	      title: 'Apa anda yakin?',
	      text: 'Anda tidak dapat memperbaharuinya kembali !',
	      type: 'warning',
	      showCancelButton: true,
	      confirmButtonColor: '#DD6B55',
	      confirmButtonText: 'Ya, Hapus!',
	      cancelButtonText: 'Tidak, Batal!',
	      closeOnConfirm: false,
	      closeOnCancel: false
	    }, (isConfirm) => {
	      if (isConfirm) {
	        let count =1;
	       
	        this.bimteksDoc = this.afs.object('Penyuluhans/' + key);
	        let Bimteks:Observable<any> = this.bimteksDoc.valueChanges(); 
	        Bimteks.subscribe(res => {
	        	if(count ==1) {
	          	count--;
	          	let drSebelum = firebase.storage().refFromURL(res.thumbSebelum);
	            let drSesudah = firebase.storage().refFromURL(res.thumbSesudah);
	          		
	          		drSebelum.delete().then(sucess => {
	                drSesudah.delete();
	           			this.bimteksDoc.remove();
	           			swal('Dihapus!', 'Penyuluhan telah dihapus.', 'success');
	          		}).catch(error => {
	          		});
	          	}
	        });
	      } else {
	        swal('Dibatalkan', 'Penyuluhan masih ada :)', 'error');
	      }
	    });
	}

}
