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
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemsComponent implements OnInit {

  public itemsDocData: AngularFireObject<any>;
  public itemsObjectObservable: Observable<any>;

     // menusItems ={
     //     title:'',
     //     description:'',
     //     offerPercentage:0,
     //     offer:false,
     //     extraOptions:[{}],
     //     price:[{}],
     //     category:'',
     //     thumb:'',
     //     tanggalberakhir: '',
     //     stok: '',
     // }

    menusItems: any = {};

    url1: any = this.menusItems.imageUrl;
    url2: any = this.menusItems.thumbUrl;

    tanggalberakhir: any = '';
    myOptions: INgxMyDpOptions = {
      dateFormat: 'mm/dd/yyyy',
    };

    ItemPrice = [];
    url:any='';
    catlelang:any=[]

    menusItemsdataRef: AngularFireObject<any>;
    menusObservable:Observable<any>;
    categoryDataRef: AngularFireList<any>;
    categoryObservable:Observable<any>;

  constructor(private route: ActivatedRoute,  public router: Router, public af: AngularFireDatabase,
      public toastr: ToastrService, public activatedRoute: ActivatedRoute) {

          this.categoryDataRef = this.af.list('/catlelang');
          this.categoryObservable = this.categoryDataRef.snapshotChanges().map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          });;
               this.categoryObservable.subscribe((response)=>{
               this.catlelang = response;
           })


      this.route.params.map(params => params['id']).subscribe((Id) => {
       if(Id != null) {
            this.menusItemsdataRef = this.af.object('/menusItems/' + Id);
            this.menusObservable = this.menusItemsdataRef.valueChanges();
            this.menusObservable.subscribe((response) => { 
              this.menusItems = response;
              console.log("menus" + JSON.stringify(response)); 
             })
          }
        });
  }

  ngOnInit() {
    // this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
    //   if(Id != null) {
    //     this.itemsDocData = this.af.object("menusItems/" + Id);
    //     this.itemsObjectObservable = this.itemsDocData.valueChanges();

    //     this.itemsObjectObservable.subscribe(res => {
    //       if(res != null) {
    //         this.menusItems = res;
    //         this.url1 = res.imageUrl;
    //         this.url2 = res.thumbUrl;
    //       }
    //     })
    //   }
    // })
  }

  onSubmitMainItems(form: NgForm){

    // if((<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0] == null &&
    //      (<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0] == null) {

    //     // take right here..!
    

    // } else {

    //   let that = this;
    //     let metadata = {
    //       contentType: 'image/*'
    //     };
    //     let storageRef = firebase.storage().ref();

    //     let fileSebelum = (<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0];
    //     let fileSesudah = (<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0];

    //     let count = 1;

    //     let drSebelum = firebase.storage().refFromURL(that.menusItems.imageUrl);
    //     let drSesudah = firebase.storage().refFromURL(that.menusItems.thumbUrl);

    //     if(count == 1) {
    //       count--;
    //       drSebelum.delete().then(sucess => {
    //       }).catch(error => {
    //         this.toastr.error('Gambar sebelum tidak dihapus');
    //       })

    //       drSesudah.delete().then(sucess => {
    //       }).catch(error => {
    //         this.toastr.error('Gambar sesudah tidak dihapus');
    //       })
    //     }

    //     let uploadTask = storageRef.child('produkLelang/' + fileSebelum.name).put(fileSebelum, metadata).then(res => {
    //       storageRef.child('produkLelang/' + fileSebelum.name).getDownloadURL().then(function(url1) {
          
    //         that.menusItems.imageUrl = url1;

    //         let uploadSesudah = storageRef.child('produkLelang/' + fileSesudah.name).put(fileSesudah, metadata).then(res => {
    //           storageRef.child('produkLelang/' + fileSesudah.name).getDownloadURL().then(function(url2) {
              
    //             that.menusItems.thumbUrl = url2;

    //             if(that.menusItems.offerPercentage > 0){
    //               that.ItemPrice = that.menusItems.price
                  
    //               for(let i=0;i<that.ItemPrice.length;i++){
    //                 that.ItemPrice[i].specialPrice=(that.ItemPrice[i].value-(that.menusItems.offerPercentage*that.ItemPrice[i].value)/100);
    //                 console.log("that.ItemPrice"+ JSON.stringify(that.ItemPrice));
    //               }
                  
    //               console.log("else")
    //               that.menusItems.offer = true;
    //             }
    //             else{
    //               console.log("else");
    //                  that.ItemPrice = that.menusItems.price;
    //               that.menusItems.offerPercentage =0;
    //               that.menusItems.offer = false;
    //             }
                
    //             if(that.menusItems.extraOptions == undefined){
    //               that.menusItems.extraOptions=[{}]
    //             }

    //             that.menusItemsdataRef.update({
    //               title:that.menusItems.title,
    //               description:that.menusItems.description,
    //               offerPercentage:that.menusItems.offerPercentage,
    //               offer:that.menusItems.offer,
    //               extraOptions:that.menusItems.extraOptions,
    //               price:that.ItemPrice,
    //               tanggalberakhir: that.tanggalberakhir,
    //               stok: that.menusItems.stok,

    //               imageUrl: that.menusItems.imageUrl,
    //               thumbUrl: that.menusItems.thumbUrl
    //             }).then((res) => {
    //               localStorage.removeItem("image");
    //               that.toastr.success('Menus-Items Data Updated Successfully!', 'Success!');
    //                that.router.navigate(['/menus/manageItems']);
    //             });
                
    //             if(localStorage.getItem("image")==null){
    //                 console.log("if");
    //                  //console.log("that.ItemPrice"+ JSON.stringify());

    //                that.menusItemsdataRef.update({
    //                   title:that.menusItems.title,
    //                   description:that.menusItems.description,
    //                   offerPercentage:that.menusItems.offerPercentage,
    //                   offer:that.menusItems.offer,
    //                   extraOptions:that.menusItems.extraOptions,
    //                   price:that.ItemPrice,
    //                   tanggalberakhir: that.tanggalberakhir,
    //                   stok: that.menusItems.stok,

    //                   imageUrl: that.menusItems.imageUrl,
    //                   thumbUrl: that.menusItems.thumbUrl
    //             }).then((res) => {
    //                      that.toastr.success('Menus-Items Data Updated Successfully!', 'Success!');
    //                 that.router.navigate(['/menus/manageItems']);
    //             });
    //           }

    //           })
    //         })
    //       })
    //     })
    // }

    if(this.menusItems.offerPercentage > 0){
          this.ItemPrice = this.menusItems.price
          
          for(let i=0;i<this.ItemPrice.length;i++){
            this.ItemPrice[i].specialPrice=(this.ItemPrice[i].value-(this.menusItems.offerPercentage*this.ItemPrice[i].value)/100);
            console.log("this.ItemPrice"+ JSON.stringify(this.ItemPrice));
          }
          
          console.log("else")
          this.menusItems.offer = true;
        }
        else{
          console.log("else");
             this.ItemPrice = this.menusItems.price;
          this.menusItems.offerPercentage =0;
          this.menusItems.offer = false;
        }
        
        if(this.menusItems.extraOptions == undefined){
          this.menusItems.extraOptions=[{}]
        }

        this.menusItemsdataRef.update({
          title:this.menusItems.title,
          description:this.menusItems.description,
          offerPercentage:this.menusItems.offerPercentage,
          offer:this.menusItems.offer,
          extraOptions:this.menusItems.extraOptions,
          price:this.ItemPrice,
          tanggalberakhir: this.tanggalberakhir,
          stok: this.menusItems.stok
        }).then((res) => {
          localStorage.removeItem("image");
          this.toastr.success('Menus-Items Data Updated Successfully!', 'Success!');
          this.router.navigate(['/menus/manageItems']);
        });
        
        if(localStorage.getItem("image")==null){
          console.log("if");
          this.menusItemsdataRef.update({
              title:this.menusItems.title,
              description:this.menusItems.description,
              offerPercentage:this.menusItems.offerPercentage,
              offer:this.menusItems.offer,
              extraOptions:this.menusItems.extraOptions,
              price:this.ItemPrice,
              tanggalberakhir: this.tanggalberakhir,
              stok: this.menusItems.stok
          }).then((res) => {
            this.toastr.success('Menus-Items Data Updated Successfully!', 'Success!');
            this.router.navigate(['/menus/manageItems']);
          });
        }

  }
  
  cancel(){
    this.router.navigate(['/menus/manageItems']);
  }

  // UploadImageSebelum(event) {
  //     var that = this;
  //     if (event.target.files && event.target.files[0]) {
  //         var reader = new FileReader();
  //         reader.onload = (event: any) => {
  //           this.url1 = event.target.result;
  //         }
  //         reader.readAsDataURL(event.target.files[0]);
  //     }
  // }

  // UploadImageSesudah(event) {
  //     var that = this;
  //       if (event.target.files && event.target.files[0]) {
  //         var reader = new FileReader();
  //         reader.onload = (event: any) => {
  //           this.url2 = event.target.result;
  //         }
  //         reader.readAsDataURL(event.target.files[0]);
  //       }
  // }

  onDateChanged(event: IMyDateModel): void {
    this.tanggalberakhir = event.formatted;
  }

  addNewChoice = function() {
    console.log(this.menusItems.extraOptions)
    if(this.menusItems.extraOptions == null){
      this.menusItems.extraOptions=[{}]
    } else {
      var newItemNo = this.menusItems.extraOptions.length+1;
      this.menusItems.extraOptions.push({});
    }
  };
            
  removeChoice = function() {
    if(this.menusItems.extraOptions.length > 0){
      var lastItem = this.menusItems.extraOptions.length-1;
      this.menusItems.extraOptions.splice(lastItem);
    }
  }

  addNewPrice = function() {
    var newItemNo = this.menusItems.price.length+1;
    this.menusItems.price.push({});
  };

  removePrice = function() {
    if(this.menusItems.price.length > 1) {
      var lastItem = this.menusItems.price.length-1;
      this.menusItems.price.splice(lastItem);
    }
  }

  toEditGambar() {
    this.route.params.map(params => params['id']).subscribe((key) => {
      if(key != null) {
        this.router.navigate(['/menus/editing-image', key]);
      }
    });
  }
}