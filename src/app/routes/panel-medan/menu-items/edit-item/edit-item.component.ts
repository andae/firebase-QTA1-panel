import { Router, ActivatedRoute } from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr' ;
import * as firebase from 'firebase';
declare var $: any;
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  menuItems: any = {};

  url1: any = this.menuItems.imageUrl;
  url2: any = this.menuItems.thumbUrl;

  public itemsDocData: AngularFireObject<any>;
  public itemsObjectObservable: Observable<any>;

  ItemPrice = [];
  categories:any=[]

    menuItemsdataRef: AngularFireObject<any>;
    menuObservable:Observable<any>;
    categoryDataRef: AngularFireList<any>;
    categoryObservable:Observable<any>;

    constructor(private route: ActivatedRoute, public router: Router, 
      public af: AngularFireDatabase, public toastr: ToastrService, public activatedRoute: ActivatedRoute) {
          
          this.categoryDataRef = this.af.list('/categories');
          this.categoryObservable = this.categoryDataRef.snapshotChanges().map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          });
          
          this.categoryObservable.subscribe((response) => {
            this.categories = response;
          })
          
          this.route.params.map(params => params['id']).subscribe((Id) => {
            if(Id != null) {
              this.menuItemsdataRef = this.af.object('/menuItems/' + Id);
              this.menuObservable = this.menuItemsdataRef.valueChanges();
              this.menuObservable.subscribe((response) => { 
                this.menuItems = response;
                console.log("menu" + JSON.stringify(response)); 
              })
            }
          });
    }

    ngOnInit() {
      this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
        if(Id != null) {
          this.itemsDocData = this.af.object('menuItems/' + Id);
          this.itemsObjectObservable = this.itemsDocData.valueChanges();

          this.itemsObjectObservable.subscribe(res => {
            if(res != null) {
              this.menuItems = res;
              this.url1 = res.imageUrl;
              this.url2 = res.thumbUrl;
            }
          })
        }
      });
    }

  onSubmitMainItems(form: NgForm){
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
    
        this.menuItemsdataRef.update({
              title:this.menuItems.title,
              description:this.menuItems.description,
              offerPercentage:this.menuItems.offerPercentage,
              offerPercentageMitra: this.menuItems.offerPercentageMitra,
              offer:this.menuItems.offer,
              extraOptions:this.menuItems.extraOptions,
              price:this.ItemPrice,
              category: this.menuItems.category,
              stok: this.menuItems.stok
              
        }).then((res) => {
            localStorage.removeItem("image");
            this.toastr.success('Menu-Items Data Updated Successfully!', 'Success!');
            this.router.navigate(['/menu/manageItems']);
        });
  }

  addNewChoice = function() {
    console.log(this.menuItems.extraOptions)
    if(this.menuItems.extraOptions == null){
      this.menuItems.extraOptions=[{}]
    } else {
      var newItemNo = this.menuItems.extraOptions.length+1;
      this.menuItems.extraOptions.push({});
    }       
  };
            
  removeChoice = function() {
    if(this.menuItems.extraOptions.length > 0) {
      var lastItem = this.menuItems.extraOptions.length-1;
      this.menuItems.extraOptions.splice(lastItem);
    }
  }

  addNewPrice = function() {
    var newItemNo = this.menuItems.price.length+1;
    this.menuItems.price.push({});
  };

  removePrice = function() {
    if(this.menuItems.price.length > 1) { 
      var lastItem = this.menuItems.price.length-1;
      this.menuItems.price.splice(lastItem);
    }
  }

  toEditGambar() {
    this.route.params.map(params => params['id']).subscribe((key) => {
      if(key != null) {
        this.router.navigate(['/menu/editing-image', key]);
      }
    });
  }

  cancel(){
    this.router.navigate(['/menu/manageItems']);
  }
}