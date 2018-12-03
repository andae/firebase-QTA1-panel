import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr' ;

@Component({
  selector: 'app-update-katartikel',
  templateUrl: './update-katartikel.component.html',
  styleUrls: ['./update-katartikel.component.scss']
})
export class UpdateKatartikelComponent implements OnInit {

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
       
        this.catDoc = afs.object('kategoriartikel/'+Id);
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
  	this.catDoc.update(this.categoryDetail).then(res => {
  		this.toasterService.success('Kategori Artikel berhasil ditambahkan!', 'Success!');
      	this.router.navigate(['/artikelkategoris/manageArtikelkategoris']);
  	
  	}).catch(error => {
  		this.toasterService.error('Ada error di update kategori artikel!', 'Error!');
  	})
  }

  ngOnInit() {
  }

}
