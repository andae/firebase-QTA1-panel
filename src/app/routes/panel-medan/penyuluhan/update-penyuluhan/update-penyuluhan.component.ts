import {Component, OnInit, ElementRef,OnDestroy} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';

declare var $: any;

@Component({
  selector: 'app-update-penyuluhan',
  templateUrl: './update-penyuluhan.component.html',
  styleUrls: ['./update-penyuluhan.component.scss']
})
export class UpdatePenyuluhanComponent implements OnInit {

  public dataUploading: number;
  news:any = { };

  url1: any = this.news.thumbSebelum;
  url2: any = this.news.thumbSesudah;
  url3: any = this.news.thumbSetelah;

  date: any;
  imageId: string;
  addNews: FormGroup;
  imageRef = 0;

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

  	categoriesList: any[] = [];
  	description:any;
  	Id: string;
  	public selectedCat:boolean;
 
  public CatCollList:AngularFireList<any>;
  public newsDocData:AngularFireObject<any>;
  public newsObjectObservable:Observable<any>;
  public catListObservable:Observable<any>;

  	public penyuluhanmitraCollList:AngularFireList<any>;
  	public penyListObservable:Observable<any>;
  	penyuluhanmitraList: any[] = [];

  constructor( public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute,
  	public router: Router, private element: ElementRef,
  	public toastr: ToastrService) { }


  updateNews(form: NgForm) {
  	this.date = Date.now();

  	if(localStorage.getItem('bimtekcontents') != null){
        this.news.description = localStorage.getItem('bimtekcontents');
    }else{
        this.news.description =this.news.description ;
    }

    if((<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0] == null) {

    	if((<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0] == null) {

    		if((<HTMLInputElement>document.getElementById('inputFileIdSetelah')).files[0] == null) {

    			this.newsDocData.update({
    				location: this.news.location,
		          	description: this.news.description, 
		          	title: this.news.title,
		          	Date: this.date,
				    
				    tahun: this.news.tahun,
				    bulan: this.news.bulan,
				    minggu: this.news.minggu,

				    penyuluhanmitra: this.news.penyuluhanmitra,
				    penyuluhanmitraId: this.news.penyuluhanmitraId,

				    nomorcantik: this.news.penyuluhanmitra + this.news.tahun + this.news.bulan + this.news.minggu

		    	}).then(res => {
		    		this.newsObjectObservable.subscribe().unsubscribe();
		           	this.toastr.info('Bimtek berhasil diperbaharui!', 'Success!');
		          	this.router.navigate(['/bimteks/manageBimtek']);
		           	localStorage.removeItem('bimtekcontents');
		    	}).catch(error => {
		    		this.toastr.warning('BimtekBimteks Belum diupdate!', 'Warning');
		    	})

	    		}

    	}
    
    } else {
    	console.log("this.news.description if" + this.news.description );
        let that = this;
        let metadata = {
        	contentType: 'image/*'
        };
        let storageRef = firebase.storage().ref();

        let fileSebelum = (<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0];
    	let fileSesudah = (<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0];
    	let fileSetelah = (<HTMLInputElement>document.getElementById('inputFileIdSetelah')).files[0];

        let count = 1;

        let drSebelum = firebase.storage().refFromURL(that.news.thumbSebelum);
        let drSesudah = firebase.storage().refFromURL(that.news.thumbSesudah);
        let drSetelah = firebase.storage().refFromURL(that.news.thumbSetelah);


        if(count == 1) {
        	count--;
        	drSebelum.delete().then(sucess => {
        	}).catch(error => {
        		this.toastr.error('Gambar sebelum tidak dihapus');
        	})

        	drSesudah.delete().then(sucess => {
        	}).catch(error => {
        		this.toastr.error('Gambar sesudah tidak dihapus');
        	})

        	drSetelah.delete().then(sucess => {
        	}).catch(error => {
        		this.toastr.error('Gambar setelah tidak dihapus');
        	})
        }

        let uploadTask = storageRef.child('Bimteks/' + fileSebelum.name).put(fileSebelum, metadata).then(res => {
        	storageRef.child('Bimteks/' + fileSebelum.name).getDownloadURL().then(function(url1) {
        		that.news.thumbSebelum = url1;
        		that.url1 = url1;

        		let uploadSesudah = storageRef.child('Bimteks/' + fileSesudah.name).put(fileSesudah, metadata).then(res => {
        			storageRef.child('Bimteks/' + fileSesudah.name).getDownloadURL().then(function(url2) {
        				that.news.thumbSesudah = url2;
        				that.url2 = url2;

        				let uploadSetelah = storageRef.child('Bimteks/' + fileSetelah.name).put(fileSetelah, metadata).then(res => {
        					storageRef.child('Bimteks/' + fileSetelah.name).getDownloadURL().then(function(url3) {

        						that.news.thumbSetelah = url3;
        						that.url3 = url3;


        						that.newsDocData.update({
				        			location: that.news.location,
						          	description: that.news.description, 
						          	title: that.news.title,
						          	Date: that.date,

				                    thumbSebelum: that.news.thumbSebelum,
				                    thumbSesudah: that.news.thumbSesudah,
				                    thumbSetelah: that.news.thumbSetelah,

				                    tahun: that.news.tahun,
				                    bulan: that.news.bulan,
				                    minggu: that.news.minggu,
				                    
				                    penyuluhanmitra: this.news.penyuluhanmitra,
				    				penyuluhanmitraId: this.news.penyuluhanmitraId,
				    				
				    				nomorcantik: this.news.penyuluhanmitra + this.news.tahun + this.news.bulan + this.news.minggu

				        		}).then(response => {
				        			localStorage.removeItem('penyuluhancontents'); 
				                    that.newsObjectObservable.subscribe().unsubscribe();
				                    that.toastr.info('Bimtek berhasil diperbaharui!', 'Success!');
				                    that.router.navigate(['/bimteks/manageBimtek']);
				        		}).catch(error => {
				        			this.toastr.warning('Bimtek tidak diupdate !', 'Warning!');
				        		})

        					})
        				})

        			})
        		})
        	});
        });
    }
  }


  	onSelectedChange(value: any) {
  		let id = value.split(".");
  		this.news.penyuluhanmitraId = id[0];
  		this.news.penyuluhanmitra = id[1];
  		this.selectedCat = true;
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

  ngOnInit() {
  		this.tahunList;
  		this.bulanList;
  		this.minggulist;

	  	this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
	  		if(Id != null) {
	  			this.newsDocData = this.afs.object('Bimteks/'+Id);
	         	this.newsObjectObservable = this.newsDocData.valueChanges();

	         	this.newsObjectObservable.subscribe(res => {
	         		if(res != null) {
	         			this.news = res;
	         			this.url1 = res.thumbSebelum;
	         			this.url2 = res.thumbSesudah;
	         			this.url3 = res.thumbSetelah;
	         		}
	         	})
	  		}
	  	});

	  	this.penyuluhanmitraCollList = this.afs.list('bimtekmitra');
	  	this.penyListObservable = this.penyuluhanmitraCollList.valueChanges();
	  	this.penyListObservable.subscribe(res => {
	  		this.penyuluhanmitraList = res;
	  	});
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

  ngOnDestroy(){
    this.newsObjectObservable.subscribe().unsubscribe();
  }

}
