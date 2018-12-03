import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;

@Component({
  selector: 'app-add-katartikel',
  templateUrl: './add-katartikel.component.html',
  styleUrls: ['./add-katartikel.component.scss']
})
export class AddKatartikelComponent implements OnInit {
  
  Category: FormGroup;
  date: any;
  color: any; 

  public categoryColl:AngularFireList<any>;

  constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
   	this.categoryColl = afs.list('kategoriartikel');
   	this.getRandomColor();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.color = color;
  }

  AddCategory(ngForm: NgForm) {
  	this.date = Date.now();

  	let catData: any = {
  		description: this.Category.value.description,
        title: this.Category.value.title,
        date: this.date,
        color: this.color
  	}

  	this.categoryColl.push(catData).then(res => {
  		this.toastr.success('Kategori Artikel Berhasil ditambahkan', "Success!");
  		this.router.navigate(['/artikelkategoris/manageArtikelkategoris']);
  	
  	}, error => {
  		this.toastr.error('Terjadi error penambahan kategori artikel!', 'Error!');
  	})
  }

  ngOnInit() {
  	this.Category = new FormGroup({
  		'title': new FormControl('', Validators.required),
      	'description': new FormControl('', Validators.required)
  	})
  }
}
