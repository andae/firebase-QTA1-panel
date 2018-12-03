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

@Component({
  selector: 'app-add-infostatistik',
  templateUrl: './add-infostatistik.component.html',
  styleUrls: ['./add-infostatistik.component.scss']
})
export class AddInfostatistikComponent implements OnInit {

  public dataUploading: number;

  news :any= {
	    title:'',
	    description:'',
	    tahun: 0,
	    bulan: 0,
	    kategori: '',
	    thumb: null,
	    nomorcantik: null,
  };

  	tahunList: any = [
	  {
	  	"tahun": "2013"
	  },
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

  	kategoriList: any = [
	  	{
	  		"kategori": "Grafik Data Mitra" 
	  	},
	  	{
	  		"kategori": "Grafik Data Stok Barang" 
	  	},
	  	{
	  		"kategori": "Grafik Data Penyuluhan" 
	  	},
	  	{
	  		"kategori": "Grafik Data Panen" 
	  	}
  	];

  url: any = "assets/img/dummy.png";
  date: any;
  imageId: string;
  addNews: FormGroup;
  imageRef = 0;
  categoriesList: any[] = [];
  public selectedCat:boolean;
 
  public newsColl:AngularFireList<any>;
  public catColl:AngularFireList<any>;
  public catObservable:Observable<any>;

  constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
  		this.newsColl = afs.list('InfoStatistiks');

    	this.tahunList;
    	this.bulanList;
    	this.kategoriList;
  }

  onAddNews(form: NgForm) {
  	var that = this;
  	let metadata = {
  		contentType: 'image/*'
  	};

  	let storageRef = firebase.storage().ref();
    let file = (<HTMLInputElement>document.getElementById('inputFileId')).files[0];


    let uploadTask = storageRef.child('InfoStatistiks/' + file.name).put(file, metadata).then(res => {
    	storageRef.child('InfoStatistiks/' + file.name).getDownloadURL().then(function(url) {
    		that.news.thumb = url;

    		console.log(that.news.tahun);
			console.log(that.news.bulan);
			console.log(that.news.kategori);

			that.news.Date = Date.now();
			that.news.nomorcantik = that.news.tahun + that.news.bulan + that.news.kategori

			if(that.news.thumb != null) {
				that.newsColl.push(that.news).then(res => {
					that.toastr.info('Informasi dan Statistik Berhasil Ditambahkan!', 'Success!');
					that.router.navigate(['/infostatistis/manageInfostatistiks']);

				}, error => {
					this.toastr.error('Error penambahan Informasi dan Statistik!', 'Error!');
				})
			}

    	});
    }).catch(error => {
    	this.toastr.error('Error upload gambar Informasi dan Statistik!', 'Error');
    });
  }

  readUrl(event) { }

  ngOnInit() {
  }

  onSelectedChangeTahun(value: any) {
	    let id = value.split();
	    this.news.tahun = id[0];
	    this.selectedCat = true;
  }

  onSelectedChangeBulan(value: any) {
	    let id = value.split();
	    this.news.bulan = id[0];
	    this.selectedCat = true;
  }

  onSelectedChangeKategori(value: any) {
  		let id = value.split();
    	this.news.kategori = id[0];
    	this.selectedCat = true;
  }

  UploadImage(event) {
	  	var that = this;
	    if (event.target.files && event.target.files[0]) {
	        var reader = new FileReader();
	      	reader.onload = (event: any) => {
	          this.url = event.target.result;
	      	}
	      	reader.readAsDataURL(event.target.files[0]);
	    }
  }

}
