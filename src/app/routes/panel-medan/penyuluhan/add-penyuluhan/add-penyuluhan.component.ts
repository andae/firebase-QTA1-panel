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
  selector: 'app-add-penyuluhan',
  templateUrl: './add-penyuluhan.component.html',
  styleUrls: ['./add-penyuluhan.component.scss']
})
export class AddPenyuluhanComponent implements OnInit {

  public dataUploading: number;

  news :any= {
	  	location: '',
	    title:'',
	    description:'',
	    tahun: 0,
	    bulan: 0,
	    minggu: 0,
	    thumbSebelum: null,
	    thumbSesudah: null,
	    thumbSetelah: null,
	    nomorcantik: null,
	    penyuluhanmitraId: '',
	    penyuluhanmitra: ''
  };

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

  url1: any = "assets/img/dummy.png";
  url2: any = "assets/img/dummy.png";
  url3: any = "assets/img/dummy.png";

  date: any;
  imageId: string;
  addNews: FormGroup;
  imageRef = 0;
  categoriesList: any[] = [];
  public selectedCat:boolean;
 
  public newsColl:AngularFireList<any>;
  public catColl:AngularFireList<any>;
  public catObservable:Observable<any>;

  penyuluhanMitraList: any[] = [];
  public penyuluhanMitraColl:AngularFireList<any>;
  public penyObservable:Observable<any>;

  constructor(public afs:AngularFireDatabase, public router: Router, public toastr: ToastrService) {
  		this.newsColl = afs.list('Bimteks');

    	this.tahunList;
    	this.bulanList;
    	this.minggulist;

    	this.penyuluhanMitraColl = afs.list('bimtekmitra');
    	this.penyObservable = this.penyuluhanMitraColl.snapshotChanges().map(actions => {
    		return actions.map(c => ({ id: c.payload.key, ...c.payload.val() }));
    	});

    	this.penyObservable.subscribe(res => {
    		this.penyuluhanMitraList = res;
    	})
  }

  onAddNews(form: NgForm) {
  	var that = this;
  	let metadata = {
  		contentType: 'image/*'
  	};

  	let storageRef = firebase.storage().ref();
    let fileSebelum = (<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0];
    let fileSesudah = (<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0];
    let fileSetelah = (<HTMLInputElement>document.getElementById('inputFileIdSetelah')).files[0];


    let uploadTask = storageRef.child('Bimteks/' + fileSebelum.name).put(fileSebelum, metadata).then(res => {
    	storageRef.child('Bimteks/' + fileSebelum.name).getDownloadURL().then(function(url1) {
    		that.news.thumbSebelum = url1;

    		let uploadSesudah = storageRef.child('Bimteks/' + fileSesudah.name).put(fileSesudah, metadata).then(res => {
    			storageRef.child('Bimteks/' + fileSesudah.name).getDownloadURL().then(function(url2) {
    				that.news.thumbSesudah = url2;

    				let uploadSetelah = storageRef.child('Bimteks/' + fileSetelah.name).put(fileSetelah, metadata).then(res => {
    					storageRef.child('Bimteks/' + fileSetelah.name).getDownloadURL().then(function(url3) {
    						that.news.thumbSetelah = url3;

    						console.log(that.news.tahun);
				    		console.log(that.news.bulan);
				    		console.log(that.news.minggu);

						    that.news.Date = Date.now();
						    that.news.nomorcantik = that.news.penyuluhanmitra + that.news.tahun + that.news.bulan + that.news.minggu;

						    if(that.news.thumbSebelum != null && that.news.thumbSesudah != null && that.news.thumbSetelah != null) {
						    	that.newsColl.push(that.news).then(res => {
						    		that.toastr.info('Bimtek Berhasil Ditambahkan!', 'Success!');
						        	that.router.navigate(['/bimteks/manageBimtek']);
						    	}, error => {
						    		this.toastr.error('Error penambahan Bimtek!', 'Error!');
						    	})
						    }

    					})
    				})
    			})
    		})
    	});
    }).catch(error => {
    	this.toastr.error('Error upload gambar Bimtek!', 'Error');
    });
  }

  	readUrl(event) {
  	}

  	ngOnInit() {
	    // $('#summernote').summernote({
	    //   height: 280,
	    //   dialogsInBody: true,
	    //   callbacks: {
	    //     onChange: (contents, $editable) => {
	    //       this.news.description = contents;
	    //     }
	    //   }
	    // });
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

  	onSelectedChangeMinggu(value: any) {
  		let id = value.split();
    	this.news.minggu = id[0];
    	this.selectedCat = true;
  	}

  	onSelectedChange(value: any) {
  		let id = value.split(".");
  		this.news.penyuluhanmitraId = id[0];
  		this.news.penyuluhanmitra = id[1];
  		this.selectedCat = true;
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

  UploadImageSetelah(event) {
	  	var that = this;
	      if (event.target.files && event.target.files[0]) {
	        var reader = new FileReader();
	      	reader.onload = (event: any) => {
	          this.url3 = event.target.result;
	      	}
	      	reader.readAsDataURL(event.target.files[0]);
	      }
  }

}
