import {Component, OnInit, ElementRef,OnDestroy} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr' ;
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/Operator/map';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
declare var $: any;

import { Upload } from '../../menu-items/upload';

@Component({
  selector: 'app-update-bimtek',
  templateUrl: './update-bimtek.component.html',
  styleUrls: ['./update-bimtek.component.scss']
})
export class UpdateBimtekComponent implements OnInit {

	public bimteksDocData:AngularFireObject<any>;
  	public bimteksObjectObservable:Observable<any>;

	public dataUploading: number;
  	bimteks:any = { };
  	date: any;
  	public selectedCat:boolean;

  	private basePath: string = '/penyuluhans';

  	gambarPenyuluhanSatu: any = this.bimteks.thumbSebelum;
  	gambarPenyuluhanDua: any = this.bimteks.thumbSesudah;
  	
  	selectedFilesSatu: FileList;
  	currentUploadSatu: Upload;
  	taskPenyuluhanSatu;
  	namaGambarSatu;
  	urlGambarSatu;

  	selectedFilesDua: FileList;
  	currentUploadDua: Upload;
  	taskPenyuluhanDua;
  	namaGambarDua;
  	urlGambarDua;

  	namaPenyuluhanSatu;
  	namaPenyuluhanDua;

  	tanggalpenyuluhan: any = '';
    myOptions: INgxMyDpOptions = {
      dateFormat: 'mm/dd/yyyy',
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

  	constructor(public afs:AngularFireDatabase, public activatedRoute: ActivatedRoute, 
  		public router: Router, private element: ElementRef,
  		public toastr: ToastrService) { }

  	ngOnInit() {
  		this.tahunList;
  		this.bulanList;
  		this.minggulist;

	  	this.activatedRoute.params.map(params => params['id']).subscribe((Id) => {
	  		if(Id != null) {
	  			this.bimteksDocData = this.afs.object('Penyuluhans/'+Id);
	         	this.bimteksObjectObservable = this.bimteksDocData.valueChanges();

	         	this.bimteksObjectObservable.subscribe(res => {
	         		if(res != null) {
	         			this.bimteks = res;
	         			this.gambarPenyuluhanSatu = res.thumbSatu;
	         			this.gambarPenyuluhanDua = res.thumbDua;

	         			this.namaPenyuluhanSatu = res.namaGambarSatu;
	         			this.namaPenyuluhanDua = res.namaGambarDua;
	         		}
	         	})
	  		}
	  	});

	  	// this.penyuluhanmitraCollList = this.afs.list('penyuluhanmitra');
	  	// this.penyListObservable = this.penyuluhanmitraCollList.valueChanges();
	  	// this.penyListObservable.subscribe(res => {
	  	// 	this.penyuluhanmitraList = res;
	  	// });
  	}

  	onDateChanged(event: IMyDateModel): void {
    	this.tanggalpenyuluhan = event.formatted;
  	}

  	updateBimtekss(ngForm: NgForm) {
  		this.date = Date.now();

  		if(this.urlGambarSatu == undefined && this.urlGambarDua == undefined) {
  			this.bimteksDocData.update({
  				location: this.bimteks.location,
			    description:this.bimteks.description,
			    date: this.date,
			    tahun: this.bimteks.tahun,
			    bulan: this.bimteks.bulan,
			    minggu: this.bimteks.minggu,
			    nomorcantik: this.bimteks.tahun + this.bimteks.bulan + this.bimteks.minggu,
			    // tanggalpenyuluhan: this.tanggalpenyuluhan
  			}).then(res => {
  				this.nextTo();
  			}).catch(error => {
  				this.toastr.warning('Penyuluhan Belum diupdate!', 'Warning');
  			});
  		} else {
  			this.deleteUploadDouble(this.namaPenyuluhanSatu, this.namaPenyuluhanDua);

  			let that = this;
  			that.bimteksDocData.update({
        		location: that.bimteks.location,
				description:that.bimteks.description,
				date: that.date,
				tahun: that.bimteks.tahun,
				bulan: that.bimteks.bulan,
				minggu: that.bimteks.minggu,
				nomorcantik: that.bimteks.tahun + that.bimteks.bulan + that.bimteks.minggu,
				// tanggalpenyuluhan: that.tanggalpenyuluhan,
				thumbSatu: that.urlGambarSatu,
				namaGambarSatu: that.namaGambarSatu,
				thumbDua: that.urlGambarDua,
				namaGambarDua: that.namaGambarDua
			}).then(response => {
				this.nextTo();
			}).catch(error => {
				this.toastr.warning('Penyuluhan tidak diupdate !', 'Warning!');
			})
  		}

  		// if((<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0] == null &&
  		// 	(<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0] == null) {

  		// 	this.bimteksDocData.update({
  		// 		location: this.bimteks.location,
			 //    description:this.bimteks.description,
			 //    date: this.date,
			 //    tahun: this.bimteks.tahun,
			 //    bulan: this.bimteks.bulan,
			 //    minggu: this.bimteks.minggu,

			 //    nomorcantik: this.bimteks.tahun + this.bimteks.bulan + this.bimteks.minggu,
			 //    // tanggalpenyuluhan: this.tanggalpenyuluhan
  			
  		// 	}).then(res => {
  		// 		this.bimteksObjectObservable.subscribe().unsubscribe();
		  //       this.toastr.info('Penyuluhan Berhasil diperbaharui!', 'Success!');
		  //       this.router.navigate(['/penyuluhans/managePenyuluhan']);
  			
  		// 	}).catch(error => {
  		// 		this.toastr.warning('Penyuluhan Belum diupdate!', 'Warning');
  		// 	})
  		
  		// } else {
  		// 	let that = this;
	   //      let metadata = {
	   //      	contentType: 'image/*'
	   //      };
	   //      let storageRef = firebase.storage().ref();

	   //      let fileSebelum = (<HTMLInputElement>document.getElementById('inputFileIdSebelum')).files[0];
	   //  	let fileSesudah = (<HTMLInputElement>document.getElementById('inputFileIdSesudah')).files[0];

	   //      let count = 1;

	   //      let drSebelum = firebase.storage().refFromURL(that.bimteks.thumbSebelum);
	   //      let drSesudah = firebase.storage().refFromURL(that.bimteks.thumbSesudah);

	   //      if(count == 1) {
	   //      	count--;
	   //      	drSebelum.delete().then(sucess => {
	   //      	}).catch(error => {
	   //      		this.toastr.error('Gambar sebelum tidak dihapus');
	   //      	})

	   //      	drSesudah.delete().then(sucess => {
	   //      	}).catch(error => {
	   //      		this.toastr.error('Gambar sesudah tidak dihapus');
	   //      	})
    //     	}

    //     	let uploadTask = storageRef.child('penyuluhans/' + fileSebelum.name).put(fileSebelum, metadata).then(res => {
    //     		storageRef.child('penyuluhans/' + fileSebelum.name).getDownloadURL().then(function(url1) {
    //     			that.bimteks.thumbSebelum = url1;
    //     			that.url1 = url1;

    //     			let uploadSesudah = storageRef.child('penyuluhans/' + fileSesudah.name).put(fileSesudah, metadata).then(res => {
    //     				storageRef.child('penyuluhans/' + fileSesudah.name).getDownloadURL().then(function(url2) {
    //     					that.bimteks.thumbSesudah = url2;
    //     					that.url2 = url2;

    //     					that.bimteksDocData.update({
    //     						location: that.bimteks.location,
				// 			    description:that.bimteks.description,
				// 			    date: that.date,
				// 			    tahun: that.bimteks.tahun,
				// 			    bulan: that.bimteks.bulan,
				// 			    minggu: that.bimteks.minggu,

				// 			    nomorcantik: that.bimteks.tahun + that.bimteks.bulan + that.bimteks.minggu,
				// 			    // tanggalpenyuluhan: that.tanggalpenyuluhan,

				// 			    thumbSebelum: that.bimteks.thumbSebelum,
				//                 thumbSesudah: that.bimteks.thumbSesudah
        					
    //     					}).then(response => {
    //     						that.bimteksObjectObservable.subscribe().unsubscribe();
				//                 that.toastr.info('Penyuluhan berhasil diperbaharui!', 'Success!');
				//                 that.router.navigate(['/penyuluhans/managePenyuluhan']);
        					
    //     					}).catch(error => {
    //     						this.toastr.warning('Penyuluhan tidak diupdate !', 'Warning!');
    //     					})
    //     				})
    //     			})
    //     		})
    //     	})
  		// }
  	}

  	private deleteUploadDouble(namaGambarSatu, namaGambarDua) {
    	this.deleteFileStorage(namaGambarSatu);
    	this.deleteFileStorage(namaGambarDua);
  	}

  	private deleteFileStorage(name:string) {
    	let storageRef = firebase.storage().ref();
    	storageRef.child(`${this.basePath}/${name}`).delete()
  	}

  	nextTo() {
  		this.bimteksObjectObservable.subscribe().unsubscribe();
		this.toastr.info('Penyuluhan Berhasil diperbaharui!', 'Success!');
		this.router.navigate(['/penyuluhans/managePenyuluhan']);
  	}

  	onSelectedChange(value: any) {
  		let id = value.split(".");
  		this.bimteks.penyuluhanmitraId = id[0];
  		this.bimteks.penyuluhanmitra = id[1];
  		this.selectedCat = true;
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

  	editUploadPenyuluhanSatu() {
	    let file = this.selectedFilesSatu.item(0);
	    this.currentUploadSatu = new Upload(file);

	    let storageRef = firebase.storage().ref();
	    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUploadSatu.file.name}`).put(this.currentUploadSatu.file);

	    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
	      this.currentUploadSatu.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
	      this.currentUploadSatu.ukuran = uploadTask.snapshot.totalBytes;

	      this.taskPenyuluhanSatu = uploadTask;
	    }, (err) => {
	      console.log("pesan err pada edit kategori: " + err);
	    }, () => {
	      this.currentUploadSatu.url = uploadTask.snapshot.downloadURL
	      this.currentUploadSatu.name = this.currentUploadSatu.file.name
	      this.saveFileData(this.currentUploadSatu);

	      this.namaGambarSatu = this.currentUploadSatu.name;
	      this.urlGambarSatu = this.currentUploadSatu.url;
	      console.log("this.urlGambarBesar:: " + this.namaGambarSatu);
	    });
  	}

  	editUploadPenyuluhanDua() {
	    let file = this.selectedFilesDua.item(0);
	    this.currentUploadDua = new Upload(file);

	    let storageRef = firebase.storage().ref();
	    let uploadTask = storageRef.child(`${this.basePath}/${this.currentUploadDua.file.name}`).put(this.currentUploadDua.file);

	    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
	      this.currentUploadDua.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
	      this.currentUploadDua.ukuran = uploadTask.snapshot.totalBytes;

	      this.taskPenyuluhanDua = uploadTask;
	    }, (err) => {
	      console.log("pesan err pada edit kategori: " + err);
	    }, () => {
	      this.currentUploadDua.url = uploadTask.snapshot.downloadURL
	      this.currentUploadDua.name = this.currentUploadDua.file.name
	      this.saveFileData(this.currentUploadDua);

	      this.namaGambarDua = this.currentUploadDua.name;
	      this.urlGambarDua = this.currentUploadDua.url;
	      console.log("this.urlGambarBesar:: " + this.namaGambarDua);
	    });
  	}

  	private saveFileData(upload: Upload) {
    	this.afs.list(`${this.basePath}/`).push(upload);
  	}

  	ngOnDestroy(){
    	this.bimteksObjectObservable.subscribe().unsubscribe();
  	}
}