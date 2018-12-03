import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-pendanaan',
  templateUrl: './edit-pendanaan.component.html',
  styleUrls: ['./edit-pendanaan.component.scss']
})
export class EditPendanaanComponent {

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

  constructor(public router: Router, private route: ActivatedRoute,
      public af: AngularFireDatabase,public toastr: ToastrService) {

      this.route.params.map(params => params['id']).subscribe((Id) => {

        if(Id != null) {
          // this.pendanaanMitrasDataRef = this.af.list('/users/' +  Id + '/pendanaanMitras');
          this.menuItemsdataRef = this.af.object('/users/' + Id );
          this.menuObservable = this.menuItemsdataRef.valueChanges();
              this.menuObservable.subscribe((response) => {
                this.menuItems = response;
                this.menuItems.pendanaanMitra = response.pendanaanMitra;
                console.log("pendanaan: " + JSON.stringify(response)); 
              })
        }

        this.menuItemsdataRefUpdate = this.af.object('/users/' + Id + '/pendanaanMitra' );
        
      })
    }

    addNewPrice = function() {
        var newItemNo = this.menuItems.pendanaanMitra.tahapan.length+1;
      this.menuItems.pendanaanMitra.tahapan.push({});
    };

    removePrice = function() {
      if(this.menuItems.pendanaanMitra.tahapan.length > 1){
            var lastItem = this.menuItems.pendanaanMitra.tahapan.length-1;
            this.menuItems.pendanaanMitra.tahapan.splice(lastItem);
        }
    }

    onSubmitMainItems() {
      this.TahapanPendanaan = this.menuItems.pendanaanMitra.tahapan;

      this.menuItemsdataRefUpdate.update({
        saldo: this.menuItems.pendanaanMitra.saldo,
        tahapan: this.TahapanPendanaan

      }).then((res) => {
        this.toastr.success('Pendanaan Mitra berhasil diperbaharui', 'Success');
        this.router.navigate(['/mitras/manageMitras']);
      });
    }

    ngOnInit() {
    }

}
