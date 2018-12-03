import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-code',
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {

	CodeMitra: FormGroup;

	public codemitraColl:AngularFireList<any>;
	date: any;

  	constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
  		this.codemitraColl = afs.list("bimtekKodeBank");
  	}

  	ngOnInit() {
  		this.CodeMitra = new FormGroup({
  			'codemitra': new FormControl('', Validators.required)
  		})
  	}

  	tambahCodeMitra(ngform: NgForm) {
  		this.date = Date.now();

  		let codeMitra: any = {
  			codemitra: this.CodeMitra.value.codemitra,
  			date: this.date
  		}

  		this.codemitraColl.push(codeMitra).then(res => {
  			this.toastr.success('Kode Bank berhasil ditambahkan.', 'Success');
  			this.router.navigate(['/bimteks/codemitra']);
  		}, error => {
  			this.toastr.error('Terjadi kesalahan pada penambahan code mitra!', 'Error');
  		})
  	}
}
