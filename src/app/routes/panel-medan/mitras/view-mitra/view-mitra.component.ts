import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {AngularFireDatabase,AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-view-mitra',
  templateUrl: './view-mitra.component.html',
  styleUrls: ['./view-mitra.component.scss']
})
export class ViewMitraComponent {

  userDetails:any={};
  userRef:AngularFireObject<any>;
  userObservable:Observable<any>;

  menuItems = {
    pendanaanMitra: {
      saldo: '',
      tahapan: '',
    }
  }

  TahapanPendanaan = {};
  menuItemsdataRef: AngularFireObject<any>;
  menuItemsdataRefUpdate: AngularFireObject<any>;
  menuObservable:Observable<any>;

  userId;

  addressListLahan: any = [];
  
  constructor(private route: ActivatedRoute, public router: Router, public af: AngularFireDatabase) {

       this.route.params.map(params => params['id']).subscribe((Id) => {
         if(Id != null) {
          this.userRef =  this.af.object('/users/' + Id);
          this.userObservable = this.userRef.valueChanges();
          this.userObservable.subscribe((response) => { 
              this.userDetails = response;
              this.userId = Id;
          })

          this.af.list('/users/' + Id + '/addressLahan').snapshotChanges().subscribe(res => {
            this.addressListLahan = [];
                    res.forEach(item => {
                        let temp = item.payload.toJSON();
                        temp['$key'] = item.payload.key;
                        this.addressListLahan.push(temp);
                    });
          });

          // this.userObservable = this.usersDataRef.snapshotChanges().map(changes => {
          //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          // });


          this.menuItemsdataRef = this.af.object('/users/' + Id );
          this.menuObservable = this.menuItemsdataRef.valueChanges();
          this.menuObservable.subscribe((response) => {
            this.menuItems = response;
            this.menuItems.pendanaanMitra = response.pendanaanMitra;
          })
        }
      });
  }

  ngOnInit() {
      this.route.params.map(params => params['id']).subscribe((Id) => {
        if(Id != null) {
          this.userRef =  this.af.object('/users/' + Id);
          this.userObservable = this.userRef.valueChanges();
          this.userObservable.subscribe((response) => { 
              this.userDetails = response;
          })
        }
      })
    }

  createId(key) {
    console.log('key: ' + key);
    this.router.navigate(['/mitras/createMitraId', key]);
  }

  updateId(key) {
    this.router.navigate(['/mitras/updateMitraId', key]);
  }

  koordinatRumah(key) {
    this.router.navigate(['/mitras/updateprofileMitraId', key]);
  }

}
