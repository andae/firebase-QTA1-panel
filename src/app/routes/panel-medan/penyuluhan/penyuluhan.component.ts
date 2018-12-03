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
  selector: 'app-penyuluhan',
  templateUrl: './penyuluhan.component.html',
  styleUrls: ['./penyuluhan.component.scss'],
  providers: [ PushNotificationService ]
})
export class PenyuluhanComponent implements OnInit {

  newsList: any[] = [];
  items: any[] = [];
  searchVal:'';
 
  public newsColl:AngularFireList<any>;
  public newsDoc:AngularFireObject<any>;
  public newsObservable:Observable<any>;

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
    this.getNewsDetailList();  
  }

  getNewsDetailList() {
  	this.newsColl = this.afs.list('Bimteks', ref => {
  		return ref.orderByChild("date");
  	});

  	this.newsObservable = this.newsColl.snapshotChanges().map(actions => {
      return actions.map(c => ({ id: c.payload.key, ...c.payload.val() }));
    });

    this.newsObservable.subscribe((response:any)=>{
    	this.newsList = response.reverse();
    })
  }

  getSearchItems(ev:any){
    let val = ev;     
    	this.newsObservable = this.afs.list('/Bimteks',ref => ref.orderByChild('title').startAt(val.charAt(0).toUpperCase() + val.slice(1))
           .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).valueChanges();
        
        this.newsObservable.subscribe((data) => {
                if(data.length != 0) {
                  this.newsList = data;
                }else{
                   this.toastr.warning('No result found !', 'warning!');
                }
        });
  }

  sendNotification(index: number) {
    for (let i = 0; i < this.newsList.length; i++) {
      if (i == index) {
        this.message.headings.en = this.newsList[index].title;
        this.message.contents.en = this.newsList[index].shortDescription;
        this.onpushNotification();
      }
    }
  }

  onpushNotification() {
    this.pushNotification.sendNotification(this.message).subscribe(res => {
      this.toastr.success('Notification Berhasil Dikirim!', 'Success!');
    })
  }

  viewArtikels(key) {
  	this.router.navigate(['/bimteks/viewBimtek', key])
  }

  updateArtikels(key) {
    this.router.navigate(['/bimteks/updateBimtek', key]);
  }

  deleteArtikels(key,i) {
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
       
        this.newsDoc = this.afs.object('Bimteks/' + key);
        let Articles:Observable<any> = this.newsDoc.valueChanges(); 
        Articles.subscribe(res => {

        	if(count ==1) {
          	count--;
          	let drSebelum = firebase.storage().refFromURL(res.thumbSebelum);
            let drSesudah = firebase.storage().refFromURL(res.thumbSesudah);
            let drSetelah = firebase.storage().refFromURL(res.thumbSetelah);
          		
          		drSebelum.delete().then(sucess => {
                drSesudah.delete();
                drSetelah.delete();
                
           			this.newsDoc.remove();
           			swal('Dihapus!', 'Bimtek telah dihapus.', 'success');
          		}).catch(error => {
          		});
          	}
        });
      } else {
        swal('Dibatalkan', 'Bimtek masih ada :)', 'error');
      }
    });
  }

}
