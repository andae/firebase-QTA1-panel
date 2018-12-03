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
  selector: 'app-diskusi',
  templateUrl: './diskusi.component.html',
  styleUrls: ['./diskusi.component.scss'],
  providers: [PushNotificationService]
})
export class DiskusiComponent implements OnInit {

  newsList: any[] = [];
  items: any[] = [];
  searchVal:'';
 
  public newsColl:AngularFireList<any>;
  public newsDoc:AngularFireObject<any>;
  public newsObservable:Observable<any>;

  private baseStorage:string = '/diskusis';
  private basePath:string = '/Diskusis';

  message: any = {
    app_id: "614240e3-c369-44a1-82fb-73227bd2c71c",
    contents: {"en": ''},
    headings: {"en": ''},
    included_segments: ["All"]
  };

  constructor(public pushNotification: PushNotificationService,
              public afs:AngularFireDatabase,
              public router: Router,
              public toastr: ToastrService) {
  }

  ngOnInit() {
    this.getNewsDetailList();
  }

  getNewsDetailList(){   
    this.newsColl = this.afs.list('Diskusis',ref => {      
        return ref.orderByChild("date")
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
    this.newsObservable = this.afs.list('/Diskusis',ref => ref.orderByChild('title').startAt(val.charAt(0).toUpperCase() + val.slice(1))
           .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).valueChanges();
        
        this.newsObservable.subscribe((data) => {
           	if(data.length != 0){
              this.newsList = data;
            }else{
               this.toastr.warning('Data belum tersedia !', 'warning!');
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
      this.toastr.success('Notifikasi Berhasil Dikirim!', 'Success!');
    })
  }


  viewNews(key) {
    this.router.navigate(['/diskusis/viewDiskusis', key]);
  }


  updateNews(key) {
    this.router.navigate(['/diskusis/updateDiskusis', key]);
  }

  deleteNews(key,i, namaGambar) {
    swal({
      title: 'Apa anda yakin?',
      text: 'Anda tidak dapat memulihkan kembali!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batal!',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {

      if(isConfirm) {
        console.log("namaGambar deleted!, " + namaGambar);
        this.deleteUpload(key, namaGambar);
        swal('Dihapus!','Diskusi berhasil dihapus!', 'success');
      } else {
        swal('Dibatalkan', 'Data anda masih tersimpan :)', 'error');
      }
    });
  }

  deleteUpload(key: any, namaGambar) {
    this.deleteFileData(key).then(() => {
      this.deleteFileStorage(namaGambar);
    }).catch(err => console.log("message err: " + err))
  }

  private deleteFileData(key: string) {
    return this.afs.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.baseStorage}/${name}`).delete()
  }
}
