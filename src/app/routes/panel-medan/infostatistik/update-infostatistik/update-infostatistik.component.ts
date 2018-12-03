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
  selector: 'app-update-infostatistik',
  templateUrl: './update-infostatistik.component.html',
  styleUrls: ['./update-infostatistik.component.scss']
})
export class UpdateInfostatistikComponent implements OnInit {

  public dataUploading: number;
  news:any = { };

  url: any = this.news.thumb;

  date: any;
  imageId: string;
  addNews: FormGroup;
  imageRef = 0;

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

  categoriesList: any[] = [];
  description:any;
  Id: string;
   public selectedCat:boolean;
 
  public CatCollList:AngularFireList<any>;
  public newsDocData:AngularFireObject<any>;
  public newsObjectObservable:Observable<any>;
  public catListObservable:Observable<any>;

  constructor( public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute,
  	public router: Router, private element: ElementRef,
  	public toastr: ToastrService) { }


  updateNews(form: NgForm) {
  	this.date = Date.now();

  	if(localStorage.getItem('infostatistikcontents') != null){
        this.news.description = localStorage.getItem('infostatistikcontents');
    }else{
        this.news.description =this.news.description ;
    }

    if((<HTMLInputElement>document.getElementById('inputFileId')).files[0] == null) {

    	this.newsDocData.update({
		          	description: this.news.description, 
		          	title: this.news.title,
		          	Date: this.date,
				    nomorcantik: this.news.tahun + this.news.bulan + this.news.kategori,
				    tahun: this.news.tahun,
				    bulan: this.news.bulan,
				    kategori: this.news.kategori
		    	}).then(res => {
		    		this.newsObjectObservable.subscribe().unsubscribe();
		           	this.toastr.info('News updated Successfully!', 'Success!');
		          	this.router.navigate(['/infostatistis/manageInfostatistiks']);
		           	localStorage.removeItem('infostatistikcontents');
		    	}).catch(error => {
		    		this.toastr.warning('Informasi dan Statistik Belum diupdate!', 'Warning');
		})
    
    } else {
    	console.log("this.news.description if" + this.news.description );
        let that = this;
        let metadata = {
        	contentType: 'image/*'
        };
        let storageRef = firebase.storage().ref();

        let file = (<HTMLInputElement>document.getElementById('inputFileId')).files[0];

        let count = 1;

        let dr = firebase.storage().refFromURL(that.news.thumb);


        if(count == 1) {
        	count--;
        	dr.delete().then(sucess => {
        	}).catch(error => {
        		this.toastr.error('Gambar sebelum tidak dihapus');
        	})
        }

        let uploadTask = storageRef.child('InfoStatistiks/' + file.name).put(file, metadata).then(res => {
        	storageRef.child('InfoStatistiks/' + file.name).getDownloadURL().then(function(url) {
        		that.news.thumb = url;
        		that.url = url;

        		that.newsDocData.update({
				        			// location: that.news.location,
						          	description: that.news.description, 
						          	title: that.news.title,
						          	Date: that.date,

				                    thumb: that.news.thumb,
				                    // thumbSesudah: that.news.thumbSesudah,
				                    // thumbSetelah: that.news.thumbSetelah,

				                    tahun: that.news.tahun,
				                    bulan: that.news.bulan,
				                    kategori: that.news.kategori,

				                    nomorcantik: that.news.tahun + that.news.bulan + that.news.kategori,

				        		}).then(response => {
				        			localStorage.removeItem('infostatistikcontents'); 
				                    that.newsObjectObservable.subscribe().unsubscribe();
				                    that.toastr.info('Informasi dan statistik berhasil diperbaharui!', 'Success!');
				                    that.router.navigate(['/infostatistis/manageInfostatistiks']);
				        		}).catch(error => {
				        			this.toastr.warning('Informasi dan statistik tidak diupdate !', 'Warning!');
				})
        	});
        });
    }
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

  	ngOnInit() {
  		this.tahunList;
  		this.bulanList;
  		this.kategoriList;

	  	this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
	  		if(Id != null) {
	  			this.newsDocData = this.afs.object('InfoStatistiks/'+Id);
	         	this.newsObjectObservable = this.newsDocData.valueChanges();

	         	this.newsObjectObservable.subscribe(res => {
	         		if(res != null) {
	         			this.news = res;
	         			this.url = res.thumb;
	         		}
	         	})
	  		}
	  	});
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

  ngOnDestroy(){
    this.newsObjectObservable.subscribe().unsubscribe();
  }
}