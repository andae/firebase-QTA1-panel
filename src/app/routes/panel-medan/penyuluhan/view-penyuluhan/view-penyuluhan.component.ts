import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

@Component({
  selector: 'app-view-penyuluhan',
  templateUrl: './view-penyuluhan.component.html',
  styleUrls: ['./view-penyuluhan.component.scss']
})
export class ViewPenyuluhanComponent implements OnInit {

  Id: string;
  news: any = {};
  totalComments: number;

  selectedNewsComments: any[] = [];
 
  public newsDoc:AngularFireObject<any>;
  public newsObservable:Observable<any>;

  constructor( public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
      if (Id != null) {
    
         this.newsDoc = afs.object('Bimteks/'+Id);
         this.newsObservable = this.newsDoc.valueChanges();
         this.newsObservable.subscribe(response=>{
           this.news = response;
         })
      }
    })
  }

  ngOnInit() {
  }

}
