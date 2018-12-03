import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import { Reference, ThenableReference } from '@firebase/database-types';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemsComponent {

  menusDetails:any={};
  menusItemsdataRef: AngularFireObject<any>;
  menusItemObservable:Observable<any>;
  categoryRef:AngularFireObject<any>;
  categoryObservable:Observable<any>;

  selectedLelang: any[] = [];
  totalPenawar: number;

  penawaranRef: AngularFireObject<any>;
  id: any;

  public eventListRef: Reference;
  public eventList: Array<any>;
  
  constructor(private route: ActivatedRoute,  public router: Router, public af: AngularFireDatabase) {

  	 	this.route.params.map(params => params['id']).subscribe((Id) => {
    	 	if(Id != null) {
           
          this.menusItemsdataRef = this.af.object('/menusItems/' + Id);
          this.menusItemObservable = this.menusItemsdataRef.valueChanges();
            this.menusItemObservable.subscribe((response) => { 
          	  this.menusDetails = response;

          	  this.categoryRef = this.af.object('/catlelang/' + response.category);
                this.categoryObservable = this.categoryRef.valueChanges();
                this.categoryObservable.subscribe((res)=>{
          		  this.menusDetails.categoryTitle = res.title;
          	  })
            })


          let commentsRef = this.af.list('menusItems/'+ Id +'/penawarans');
          let commets = commentsRef.valueChanges();
          commets.subscribe(res => {
              this.selectedLelang = res;
              if(res != null) {
                this.totalPenawar = this.selectedLelang.length;
              }
           });

          this.eventListRef = firebase.database().ref('menusItems/'+ Id +'/penawarans');
          this.eventListRef.on('value', eventListSnapshot => {
            this.eventList = [];
            eventListSnapshot.forEach(snap => {
              this.eventList.push({
                id: snap.key,
                hargapenawaran: snap.val().hargapenawaran,
                name: snap.val().name,
                createdAt: snap.val().createdAt,
                thumb: snap.val().thumb,
                berhasil: snap.val().berhasil
              });
              return false;
            });
          });
        }

        this.id = Id;

      });      
  }

  getEventList(): Reference {
    return this.eventListRef;
  }

  onSelectionChange(key) {
    console.log('cliked view-item-component');
    console.log('key: ' + key);
  }

  updateActive(value: boolean, key) {
    this.penawaranRef = this.af.object('menusItems/'+ this.id +'/penawarans/' + key);

    this.penawaranRef.update({
      berhasil: value
    });
  }

}
