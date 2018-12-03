import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

@Component({
  selector: 'app-view-bimtek',
  templateUrl: './view-bimtek.component.html',
  styleUrls: ['./view-bimtek.component.scss']
})
export class ViewBimtekComponent implements OnInit {

  	public bimteksDoc:AngularFireObject<any>;
  	public bimteksObservable:Observable<any>;

  	bimteks: any = {};

  	constructor(public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute) {
  		this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
  			if(Id != null) {
  				this.bimteksDoc = afs.object("Penyuluhans/" + Id);
  				this.bimteksObservable = this.bimteksDoc.valueChanges();
  				this.bimteksObservable.subscribe(res => {
  					this.bimteks = res;
  				})
  			}
  		})
  	}

  	ngOnInit() {
  	}

}
