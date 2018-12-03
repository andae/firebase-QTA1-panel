import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr' ;

@Component({
  selector: 'app-update-katdiskusi',
  templateUrl: './update-katdiskusi.component.html',
  styleUrls: ['./update-katdiskusi.component.scss']
})
export class UpdateKatdiskusiComponent implements OnInit {

  categoryDetail: any = {};
  key: any;
 
  public categoryColl:AngularFireList<any>;
  public catDoc:AngularFireObject<any>;
  public testData:Observable<any>;
  constructor(public afs:AngularFireDatabase,
              private route: ActivatedRoute,
              public router: Router, public toasterService: ToastrService) {

    this.route.params.map(params => params['id']).subscribe((Id) => {
      if (Id != null) {
       
        this.catDoc = afs.object('diskusikategori/'+Id);
        this.testData = this.catDoc.valueChanges();      
        this.testData.subscribe((response) => {
            this.categoryDetail = response;
           
          });
        }else{
          //console.log("Id not recived");
        }
    });
  }


  updateCategory(form: NgForm) {
    this.catDoc.update(this.categoryDetail).then(res=>{
      this.toasterService.success('Kategori Diskusi berhasil ditambah!', 'Success!');
      this.router.navigate(['/diskusikategoris/manageDiskusikategoris']);
    }).catch(error=>{      
      this.toasterService.error('Terjadi error!', 'Error!');
    })
  }

  ngOnInit() {
  }

}
