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

import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-add-bimtek',
  templateUrl: './add-bimtek.component.html',
  styleUrls: ['./add-bimtek.component.scss']
})
export class AddBimtekComponent implements OnInit {

	myOptions: INgxMyDpOptions = {
    	dateFormat: 'mm/dd/yyyy',
  	};
  	tanggalpenyuluhan: any = '';

	public dataUploading: number;

  	bimteks :any= {
	  	location: '',
	    description:'',
	    date: '',
	    tahun: 0,
	    bulan: 0,
	    minggu: 0,
	    thumbSatu: null,
	    namaGambarSatu: '',
	    thumbDua: null,
	    namaGambarDua: '',
	    nomorcantik: null,
	    tanggalpenyuluhan: ''
  	};
  	public myDatePickerOptions; 

  	tahunList: any = [
	  {
	  	"tahun": "2014"
	  },
	  {
	  	"tahun": "2015"
	  },
	  {
	  	"tahun": "2016"
	  },
	  {
	  	"tahun": "2017"
	  },
	  {
	  	"tahun": "2018"
	  }
  	];

  	bulanList: any = [
	  	{
		  	"bulan": "januari"
		},
		{
		  	"bulan": "februari"
		},
		{
		  	"bulan": "maret"
		},
		{
		  	"bulan": "april"
		},
		{
		  	"bulan": "mei"
		},
		{
		  	"bulan": "juni"
		},
		{
		  	"bulan": "juli"
		},
		{
		  	"bulan": "agustus"
		},
		{
		  	"bulan": "september"
		},
		{
		  	"bulan": "oktober"
		},
		{
		  	"bulan": "november"
		},
		{
		  	"bulan": "desember"
		}
  	];

  	minggulist: any = [
	  	{
	  		"minggu": "minggu I" 
	  	},
	  	{
	  		"minggu": "minggu II" 
	  	},
	  	{
	  		"minggu": "minggu III" 
	  	},
	  	{
	  		"minggu": "minggu IV" 
	  	}
  	];

  	gambarPenyuluhanSatu: any = "assets/img/dummy.png";
  	gambarPenyuluhanDua: any = "assets/img/dummy.png";
  	selectedFilesSatu: FileList;
  	selectedFilesDua: FileList;

  	currentUploadSatu: Upload;
  	currentUploadDua: Upload;
  	taskPenyuluhanSatu;
  	taskPenyuluhanDua;

  	urlGambarSatu;
  	namaGambarSatu;
  	urlGambarDua;
  	namaGambarDua;

  	private basePath: string = '/penyuluhans';

  	date: any;
  	imageId: string;
  	addNews: FormGroup;
  	public selectedCat:boolean;
 
  	public bimteksColl:AngularFireList<any>;

  	constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
  		this.tahunList;
  		this.bulanList;
  		this.minggulist;

  		this.bimteksColl = afs.list('Penyuluhans');
  	}

  	onDateChanged(event: IMyDateModel): void {
  		this.tanggalpenyuluhan = event.formatted;
  	}

  	ngOnInit() {
  	}

  	onAddBimtek(form:NgForm) {
  		var that = this;

  		that.bimteks.tanggalpenyuluhan = that.tanggalpenyuluhan;
  		that.bimteks.date = Date.now();
  		that.bimteks.nomorcantik = that.bimteks.tahun + that.bimteks.bulan + that.bimteks.minggu;

  		that.bimteks.thumbSatu = localStorage.getItem("urlGambarSatu");
	    that.bimteks.namaGambarSatu = localStorage.getItem("namaGambarSatu");
	    that.bimteks.thumbDua = localStorage.getItem("urlGambarDua");
	    that.bimteks.namaGambarDua = localStorage.getItem("namaGambarDua");

	    that.bimteksColl.push(that.bimteks).then(res => {
	    	that.toastr.info('Penyuluhan Berhasil Ditambahkan!', 'Success!');
	    	that.router.navigate(['/penyuluhans/managePenyuluhan']);
	    }, error => {
	    	this.toastr.error('Error penambahan Penyuluhan!', 'Error!');
	    });

	    console.log("this.urlGambarSatu --> " + this.urlGambarSatu);
	    console.log("this.namaGambarSatu --> " + this.namaGambarSatu);
	    localStorage.removeItem("urlGambarSatu");
	    localStorage.removeItem("namaGambarSatu");

	    console.log("this.urlGambarDua --> " + this.urlGambarDua);
	    console.log("this.namaGambarDua --> " + this.namaGambarDua);
	    localStorage.removeItem("urlGambarDua");
	    localStorage.removeItem("namaGambarDua");
  	}

  	onSelectedChangeTahun(value: any) {
	    let id = value.split();
	    this.bimteks.tahun = id[0];
	    this.selectedCat = true;
  	}

  	onSelectedChangeBulan(value: any) {
	    let id = value.split();
	    this.bimteks.bulan = id[0];
	    this.selectedCat = true;
  	}

  	onSelectedChangeMinggu(value: any) {
  		let id = value.split();
    	this.bimteks.minggu = id[0];
    	this.selectedCat = true;
  	}

  	detectFilesSatu(event) {
    	this.selectedFilesSatu = event.target.files;
    	if (event.target.files && event.target.files[0]) {
	      	var reader = new FileReader();
	      	reader.onload = (event: any) => {
	        	this.gambarPenyuluhanSatu = event.target.result;
	      	}
	      	reader.readAsDataURL(event.target.files[0]);
    	}
  	}

  	detectFilesDua(event) {
    	this.selectedFilesDua = event.target.files;
    	if (event.target.files && event.target.files[0]) {
	      	var reader = new FileReader();
	      	reader.onload = (event: any) => {
	        	this.gambarPenyuluhanDua = event.target.result;
	      	}
	      	reader.readAsDataURL(event.target.files[0]);
    	}
  	}

  	uploadPenyuluhanSatu() {
	    let file = this.selectedFilesSatu.item(0);
	    this.currentUploadSatu = new Upload(file);

	    let storageRef = firebase.storage().ref();
	    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUploadSatu.file.name}`).put(this.currentUploadSatu.file);

	    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
	      this.currentUploadSatu.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
	      this.currentUploadSatu.ukuran = uploadTask.snapshot.totalBytes;

	      this.taskPenyuluhanSatu = uploadTask;
	    }, (err) => {
	      console.log("err penambahan gambar kategori: " + err);
	    }, () => {
	      this.currentUploadSatu.url = uploadTask.snapshot.downloadURL
	      this.currentUploadSatu.name = this.currentUploadSatu.file.name
	      this.saveFileData(this.currentUploadSatu);

	      this.urlGambarSatu = this.currentUploadSatu.url;
	      this.namaGambarSatu = this.currentUploadSatu.name;

	      localStorage.setItem("urlGambarSatu", this.urlGambarSatu);
	      localStorage.setItem("namaGambarSatu", this.namaGambarSatu);
	    });
  	}

  	uploadPenyuluhanDua() {
	    let file = this.selectedFilesDua.item(0);
	    this.currentUploadDua = new Upload(file);

	    let storageRef = firebase.storage().ref();
	    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUploadDua.file.name}`).put(this.currentUploadDua.file);

	    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
	      this.currentUploadDua.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
	      this.currentUploadDua.ukuran = uploadTask.snapshot.totalBytes;

	      this.taskPenyuluhanDua = uploadTask;
	    }, (err) => {
	      console.log("err penambahan gambar kategori: " + err);
	    }, () => {
	      this.currentUploadDua.url = uploadTask.snapshot.downloadURL
	      this.currentUploadDua.name = this.currentUploadDua.file.name
	      this.saveFileData(this.currentUploadDua);

	      this.urlGambarDua = this.currentUploadDua.url;
	      this.namaGambarDua = this.currentUploadDua.name;

	      localStorage.setItem("urlGambarDua", this.urlGambarDua);
	      localStorage.setItem("namaGambarDua", this.namaGambarDua);
	    });
  	}

  private saveFileData(upload: Upload) {
    this.afs.list(`${this.basePath}/`).push(upload);
  }
}