import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;

@Component({
  selector: 'app-add-katdiskusi',
  templateUrl: './add-katdiskusi.component.html',
  styleUrls: ['./add-katdiskusi.component.scss']
})
export class AddKatdiskusiComponent implements OnInit {

  Category: FormGroup;
  date: any;
  color: any; 

  public categoryColl:AngularFireList<any>;
  constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
  
   	this.categoryColl = afs.list('diskusikategori');
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

  AddCategory(ngform: NgForm) {
     this.date = Date.now();
   
    let catData:any={
       description: this.Category.value.description,
        title: this.Category.value.title,
        date: this.date,
        color: this.color
    }
    this.categoryColl.push(catData).then(res=>{
      this.toastr.success(' Kategori diskusi ditambahkan!', 'Success!');
      this.router.navigate(['/diskusikategoris/manageDiskusikategoris']);
    },error=>{
       this.toastr.error('Got some Error!', 'Error!');
    })
  }


  ngOnInit() {
    this.Category = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    })
  }

}
