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

import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemsComponent {

  myOptions: INgxMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
  };


  url: any = '';
  tanggalberakhir: any = '';

  url1: any = "assets/img/dummy.png";
  url2: any = "assets/img/dummy.png";

  menusItems = {
    title: '',
    description: '',
    offerPercentage: 0,
    extraOptions: [{}],
    offer: false,
    price: [{}],
    category: '',
    tanggalberakhir: '',
    stok: '',
    imageUrl: null,
    thumbUrl: null
  }

  public myDatePickerOptions; 
  ItemPrice = [];

  catlelang: Array<any>
  categoryDataRef: AngularFireList<any>;
  categoryObservable:Observable<any>;
  menusItemsDataRef: AngularFireList<any>;  
  imageId: string;

  constructor(public af: AngularFireDatabase, public toastr: ToastrService, public router: Router) {
    this.menusItemsDataRef = af.list('/menusItems');
    this.categoryDataRef = af.list('/catlelang');

    this.categoryObservable = this.categoryDataRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });;
    this.categoryObservable.subscribe((response) => {
      this.catlelang = response
    })
  }

  onDateChanged(event: IMyDateModel): void {
    // date selected

    this.tanggalberakhir = event.formatted;

    // console.log('onDateChanged(): ', event.formatted );

    // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);

  }

  onSubmitMainItems(form: NgForm) {
    // var that = this;
    // let metadata = {
    //   contentType: 'image/*'
    // };

    // let storageRef = firebase.storage().ref();
    // let fileSebelum = (<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0];
    // let fileSesudah = (<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0];

    // let uploadTask = storageRef.child('produkToko/' + fileSebelum.name).put(fileSebelum, metadata).then(res => {
    //   storageRef.child('produkToko/' + fileSebelum.name).getDownloadURL().then(function(url1) {
    //     that.menusItems.imageUrl = url1;

    //     let uploadSesudah = storageRef.child('produkToko/' + fileSesudah.name).put(fileSesudah, metadata).then(res => {
    //       storageRef.child('produkToko/' + fileSesudah.name).getDownloadURL().then(function(url2) {
    //         that.menusItems.thumbUrl = url2;

                // take here..!
            
    //       });
    //     })
    //   })
    // })

    if (this.menusItems.offerPercentage > 0) {
              this.ItemPrice = this.menusItems.price
              for (let i = 0; i < this.ItemPrice.length; i++) {
                this.ItemPrice[i].specialPrice = (this.ItemPrice[i].value - (this.menusItems.offerPercentage * this.ItemPrice[i].value) / 100);
                console.log("this.ItemPrice" + JSON.stringify(this.ItemPrice));
              }
              this.menusItems.offer = true;
            }
            else {
              console.log("else");
              this.ItemPrice = this.menusItems.price;
              this.menusItems.offerPercentage = 0;
              this.menusItems.offer = false;
            }

            this.menusItems.tanggalberakhir = this.tanggalberakhir;

            this.menusItemsDataRef.push(this.menusItems).then((res) => {
              this.toastr.success('Menus-Items Data Added Successfully!', 'Success!');
              this.router.navigate(['/menus/uploading-image/', res.key]);
              console.log("res::: " + res.key);
            }, err => {
              this.toastr.error('Gagal Menambahkan Lelang!', err);
            });

    
    // this.uploader.uploadAll();
    // this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
    //   let res: any = JSON.parse(response);
    //   this.menusItems.thumb = res.url;

    //   this.menusItems.tanggalberakhir = this.tanggalberakhir;

    //   this.menusItemsDataRef.push(this.menusItems).then((res) => {
    //     this.toastr.success('Menus-Items Data Added Successfully!', 'Success!');
    //     this.router.navigate(['/menus/manageItems']);
    //   });
    // }
  }

  UploadImageSebelum(event) {
      var that = this;
      if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.url1 = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
      }
    }

    UploadImageSesudah(event) {
      var that = this;
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.url2 = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }
    }

  // addNewChoice = function() {
  //   var newItemNo = this.menuItems.extraOptions.length+1;
  //   this.menuItems.extraOptions.push({});
  // };

  addNewChoice = function () {
    var newItemNo = this.menusItems.extraOptions.length + 1;
    this.menusItems.extraOptions.push({});
  };

  removeChoice = function () {
    if (this.menusItems.extraOptions.length > 0) {
      var lastItem = this.menusItems.extraOptions.length - 1;
      this.menusItems.extraOptions.splice(lastItem);
    }
  }

  addNewPrice = function () {
    var newItemNo = this.menusItems.price.length + 1;
    this.menusItems.price.push({});
  };

  removePrice = function () {
    if (this.menusItems.price.length > 1) {
      var lastItem = this.menusItems.price.length - 1;
      this.menusItems.price.splice(lastItem);
    }
  }

  cancel() {
    this.router.navigate(['/menus/manageItems']);
  }
}
