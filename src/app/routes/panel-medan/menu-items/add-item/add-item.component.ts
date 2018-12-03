import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import * as firebase from 'firebase';
declare var $: any;
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
    menuItems = {
        title: '',
        description: '',
        stok: '',
        offerPercentage: 0,
        offerPercentageMitra: 0,
        extraOptions: [{}],
        offer: false,
        price: [{}],
        imageUrl: null,
        thumbUrl: null,
        linkVideo: ''
    }

    ItemPrice = [];

    url1: any = "assets/img/dummy.png";
    url2: any = "assets/img/dummy.png";

    public menuItemsColl:AngularFireList<any>;

    categories: Array<any>
    categoryDataRef: AngularFireList<any>;
    categoryObservable:Observable<any>;

    constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService,
        public spinner: Ng4LoadingSpinnerService) {

        this.menuItemsColl = afs.list('/menuItems');

        this.categoryDataRef = afs.list('/categories');

        this.categoryObservable = this.categoryDataRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        
        this.categoryObservable.subscribe((response) => {
          this.categories = response
        });
    }

    ngOnInit() {
    }

    onSubmitMainItems(form: NgForm) {
      if(this.menuItems.offerPercentage > 0) {
          this.ItemPrice = this.menuItems.price
          for(let i=0; i < this.ItemPrice.length; i++) {
            this.ItemPrice[i].specialPrice = (this.ItemPrice[i].value-(this.menuItems.offerPercentage * this.ItemPrice[i].value) / 100);
            
            // this.ItemPrice[i].specialPriceMitra = (this.ItemPrice[i].value-(this.menuItems.offerPercentageMitra * this.ItemPrice[i].value) / 100);
            
            console.log("this.ItemPrice"+ JSON.stringify(this.ItemPrice));
          }
          console.log("else")
          this.menuItems.offer = true;
    } else if(this.menuItems.offerPercentage == 0) {

        this.ItemPrice = this.menuItems.price
        for(let i=0;i<this.ItemPrice.length;i++) {
            this.ItemPrice[i].specialPrice = this.ItemPrice[i].value;
            
            console.log("this.ItemPrice"+ JSON.stringify(this.ItemPrice));
        }

        console.log("else")
        this.menuItems.offer = false;
      
        } else {
          console.log("else");
          this.ItemPrice = this.menuItems.price;
          this.menuItems.offerPercentage = 0;
          this.menuItems.offerPercentageMitra = 0;
          this.menuItems.offer = false;
        }

        if(this.menuItems.offerPercentageMitra > 0) {
          this.ItemPrice = this.menuItems.price
            for(let i=0;i<this.ItemPrice.length;i++) {
              // this.ItemPrice[i].specialPrice = (this.ItemPrice[i].value-(this.menuItems.offerPercentage * this.ItemPrice[i].value) / 100);
              
              this.ItemPrice[i].specialPriceMitra = (this.ItemPrice[i].value-(this.menuItems.offerPercentageMitra * this.ItemPrice[i].value) / 100);
              
              console.log("this.ItemPrice"+ JSON.stringify(this.ItemPrice));
            }
            console.log("else")
            this.menuItems.offer = true;
        } else if(this.menuItems.offerPercentageMitra == 0) {
          
          this.ItemPrice = this.menuItems.price
            for(let i=0; i<this.ItemPrice.length; i++) {
              this.ItemPrice[i].specialPriceMitra = this.ItemPrice[i].value;
              
              console.log("this.ItemPrice"+ JSON.stringify(this.ItemPrice));
            }
            console.log("else")
            this.menuItems.offer = false;
        }

        if(this.menuItems.extraOptions == undefined){
         this.menuItems.extraOptions=[{}]
        }
    
        this.menuItemsColl.push(this.menuItems).then((res) => {

            this.toastr.success('Menu-Items Data Added Successfully!', 'Success!');
            this.router.navigate(['/menu/upload-image/', res.key]);
            console.log("res::: " + res.key);
            
        }, error => {
          this.toastr.error('Gagal menambahkan Produk!', 'Error!');
        });      
    }

    addNewPrice = function () {
        var newItemNo = this.menuItems.price.length + 1;
        this.menuItems.price.push({});
    }

    removePrice = function () {
        if (this.menuItems.price.length > 1) {
          var lastItem = this.menuItems.price.length - 1;
          this.menuItems.price.splice(lastItem);
        }
    }
}
