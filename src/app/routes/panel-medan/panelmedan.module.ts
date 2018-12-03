import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//import {ColorPickerModule, ColorPickerService} from 'angular2-color-picker/lib';
import {CustomFormsModule} from 'ng2-validation';
import {SharedModule} from '../../shared/shared.module';

import {CategoriesComponent} from './categories/categories.component';
import {AddCategoriesComponent} from './categories/add-categories/add-categories.component';
import {CatlelangComponent} from './catlelang/catlelang.component';
import {AddCatlelangComponent} from './catlelang/add-catlelang/add-catlelang.component';
import {MenuItemsComponent} from './menu-items/menu-items.component';
import {AddItemComponent} from './menu-items/add-item/add-item.component';

import {MenusItemsComponent} from './menus-items/menus-items.component';
import {AddItemsComponent} from './menus-items/add-items/add-item.component';


// import {LelangItemxComponent} from './lelang-itemx/lelang-itemx.component';
// import {AddItemxComponent} from './lelang-itemx/add-itemx/add-itemx.component';

import {OrdersComponent} from './orders/orders.component';
import {ViewOrderComponent} from './orders/view-order/view-order.component';

import {OrderlComponent} from './orderl/orderl.component';
import {ViewOrderlComponent} from './orderl/view-orderl/view-order.component';

 import {UsersComponent} from './users/users.component';
 import {AddUserComponent} from './users/add-user/add-user.component'; 
 import {ViewUserComponent} from './users/view-user/view-users.component';

import {SettingsComponent} from './settings/settings.component';
import {TagsComponent} from './tags/tags.component';
import {EditTagesComponent} from './tags/edit-tages/edit-tages.component';
import {AddTagsComponent} from './tags/add-tags/add-tags.component';
import {BusinessInfoComponent} from './business-info/business-info.component';
import {ProfileComponent} from './profile/profile.component';
import {EditCategoryComponent} from './categories/edit-category/edit-category.component';
import {ViewCategoryComponent} from './categories/view-category/view-category.component';
import {EditCatlelangComponent} from './catlelang/edit-catlelang/edit-catlelang.component';
import {ViewCatlelangComponent} from './catlelang/view-catlelang/view-catlelang.component';
import {ViewItemComponent} from './menu-items/view-item/view-item.component';
import {EditItemComponent} from './menu-items/edit-item/edit-item.component';

// import {ViewItemxComponent} from './lelang-itemx/view-itemx/view-itemx.component';
// import {EditItemxComponent} from './lelang-itemx/edit-itemx/edit-itemx.component';

import {ViewItemsComponent} from './menus-items/view-items/view-item.component';
import {EditItemsComponent} from './menus-items/edit-items/edit-item.component';


import {NewsComponent} from './news/news.component';
import {AddNewsComponent} from './news/add-news/add-news.component';
import {EditNewsComponent} from './news/edit-news/edit-news.component';
import {ViewNewsComponent} from './news/view-news/view-news.component';
import {CouponsComponent} from './coupons/coupons.component';
import {AddCouponsComponent} from './coupons/add-coupons/add-coupons.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import {LoyalitysComponent} from './loyalitys/loyalitys.component';

import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {FileUploadModule} from 'ng2-file-upload';
import {AuthService} from '../pages/login/auth.service';
import {LoginService} from '../pages/login/login.service';
import { UploadService } from './menu-items/upload.service';
import { UploadLelangService } from './menus-items/upload-lelang.service';
import { CategoryService } from './categories/category-service.service';
import { CatlelangService } from './catlelang/catlelang.service';
import { BerandaService } from './beranda/beranda.service';

import {Ng2PaginationModule} from 'ng2-pagination';
 
import { ChatComponent } from './chat/chat.component';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { StoreModule } from '@ngrx/store';
import { chatData } from "./chat/action";
import { SubscribersComponent } from './subscribers/subscribers.component';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { ViewComponent } from './table-booking/view/view.component';
import { DeliveryOptionsComponent } from './delivery-options/delivery-options.component';
import { InvoiceComponent } from './orders/invoice/invoice.component';
import { InvoicesComponent } from './orderl/invoices/invoice.component';
import { ArtikelKategoriComponent } from './artikel-kategori/artikel-kategori.component';
import { ArtikelComponent } from './artikel/artikel.component';

import { UpdateKatartikelComponent } from './artikel-kategori/update-katartikel/update-katartikel.component';
import { AddKatartikelComponent } from './artikel-kategori/add-katartikel/add-katartikel.component';
import { AddArtikelsComponent } from './artikel/add-artikels/add-artikels.component';
import { ViewArtikelsComponent } from './artikel/view-artikels/view-artikels.component';
import { UpdateArtikelsComponent } from './artikel/update-artikels/update-artikels.component';
import { DiskusiKategoriComponent } from './diskusi-kategori/diskusi-kategori.component';
import { AddKatdiskusiComponent } from './diskusi-kategori/add-katdiskusi/add-katdiskusi.component';
import { UpdateKatdiskusiComponent } from './diskusi-kategori/update-katdiskusi/update-katdiskusi.component';
import { DiskusiComponent } from './diskusi/diskusi.component';
import { AddDiskusisComponent } from './diskusi/add-diskusis/add-diskusis.component';
import { UpdateDiskusisComponent } from './diskusi/update-diskusis/update-diskusis.component';
import { ViewDiskusisComponent } from './diskusi/view-diskusis/view-diskusis.component';
import { PenyuluhanComponent } from './penyuluhan/penyuluhan.component';
import { InfostatistikComponent } from './infostatistik/infostatistik.component';
import { AddPenyuluhanComponent } from './penyuluhan/add-penyuluhan/add-penyuluhan.component';
import { ViewPenyuluhanComponent } from './penyuluhan/view-penyuluhan/view-penyuluhan.component';
import { UpdatePenyuluhanComponent } from './penyuluhan/update-penyuluhan/update-penyuluhan.component';
import { AddInfostatistikComponent } from './infostatistik/add-infostatistik/add-infostatistik.component';
import { UpdateInfostatistikComponent } from './infostatistik/update-infostatistik/update-infostatistik.component';
import { ViewInfostatistikComponent } from './infostatistik/view-infostatistik/view-infostatistik.component';

import { CKEditorModule } from 'ngx-ckeditor';
import { MitrasComponent } from './mitras/mitras.component';
import { AddMitraComponent } from './mitras/add-mitra/add-mitra.component';
import { ViewMitraComponent } from './mitras/view-mitra/view-mitra.component';
import { EditPendanaanComponent } from './mitras/edit-pendanaan/edit-pendanaan.component';
import { CreatePendanaanComponent } from './mitras/create-pendanaan/create-pendanaan.component';
import { AddPenyuluhanMitraComponent } from './penyuluhan/penyuluhan-mitra/add-mitra/add-mitra.component';

// currency
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";

// datepicker
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { BerandaComponent } from './beranda/beranda.component';
import { AddBerandaComponent } from './beranda/add-beranda/add-beranda.component';
import { ViewBerandaComponent } from './beranda/view-beranda/view-beranda.component';
import { EditBerandaComponent } from './beranda/edit-beranda/edit-beranda.component';
import { EditCouponsComponent } from './coupons/edit-coupons/edit-coupons.component';
import { PenyuluhanMitraComponent } from './penyuluhan/penyuluhan-mitra/penyuluhan-mitra.component';
import { UpdateMitraComponent } from './penyuluhan/penyuluhan-mitra/update-mitra/update-mitra.component';
import { PenyuluhanCodeComponent } from './penyuluhan/penyuluhan-code/penyuluhan-code.component';
import { AddCodeComponent } from './penyuluhan/penyuluhan-code/add-code/add-code.component';
import { UpdateCodeComponent } from './penyuluhan/penyuluhan-code/update-code/update-code.component';
import { CreateMitraIdComponent } from './mitras/create-mitra-id/create-mitra-id.component';
import { BimtekComponent } from './bimtek/bimtek.component';
import { AddBimtekComponent } from './bimtek/add-bimtek/add-bimtek.component';
import { ViewBimtekComponent } from './bimtek/view-bimtek/view-bimtek.component';
import { UpdateBimtekComponent } from './bimtek/update-bimtek/update-bimtek.component';
import { UpdateMitraIdComponent } from './mitras/update-mitra-id/update-mitra-id.component';
import { UpdateProfileMitraComponent } from './mitras/update-profile-mitra/update-profile-mitra.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    decimal: ",",
    precision: 0,
    prefix: "Rp ",
    suffix: "",
    thousands: ","
};

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DropZoneDirective } from './drop-zone/drop-zone.directive';
import { ImageUploadingComponent } from './menu-items/image-uploading/image-uploading.component';
import { ImageEditingComponent } from './menu-items/image-editing/image-editing.component';
import { EditingImageComponent } from './menus-items/editing-image/editing-image.component';
import { UploadingImageComponent } from './menus-items/uploading-image/uploading-image.component';

@NgModule({
    imports: [
        SharedModule,
        CustomFormsModule,
        Ng2PaginationModule,
        Ng2CloudinaryModule,
        FileUploadModule,        
        StoreModule.forRoot({data: chatData}),
        CKEditorModule,
        CurrencyMaskModule,
        NgxMyDatePickerModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot()
    ],

    declarations: [
        CategoriesComponent,
        AddCategoriesComponent,
        CatlelangComponent,
        AddCatlelangComponent,
        MenuItemsComponent,
        AddItemComponent,

        MenusItemsComponent,
        AddItemsComponent,


        // LelangItemxComponent,
        // AddItemxComponent,
        
        OrdersComponent,  
        OrderlComponent,

        SettingsComponent,
        TagsComponent,
        EditTagesComponent,
        AddTagsComponent,
        BusinessInfoComponent,
        ViewOrderComponent,
        ViewOrderlComponent,

        ProfileComponent,
        EditCategoryComponent,
        ViewCategoryComponent,
        EditCatlelangComponent,
        ViewCatlelangComponent,
        NewsComponent,
        AddNewsComponent,
        EditNewsComponent,
        ViewNewsComponent,
        ViewItemComponent,
        EditItemComponent,

        ViewItemsComponent,
        EditItemsComponent,

        // ViewItemxComponent,
        // EditItemxComponent,

        AddCouponsComponent,
        CouponsComponent,
        PushNotificationComponent,
        ChatComponent,
        ChatBoxComponent,
        UsersComponent,
        ViewUserComponent,
        AddUserComponent,
        LoyalitysComponent,
        SubscribersComponent,
        TableBookingComponent,
        ViewComponent,
        DeliveryOptionsComponent,
        InvoiceComponent,
        InvoicesComponent,
        ArtikelKategoriComponent,
        ArtikelComponent,
        UpdateKatartikelComponent,
        AddKatartikelComponent,
        AddArtikelsComponent,
        ViewArtikelsComponent,
        UpdateArtikelsComponent,
        DiskusiKategoriComponent,
        AddKatdiskusiComponent,
        UpdateKatdiskusiComponent,
        DiskusiComponent,
        AddDiskusisComponent,
        UpdateDiskusisComponent,
        ViewDiskusisComponent,
        PenyuluhanComponent,
        InfostatistikComponent,
        AddPenyuluhanComponent,
        ViewPenyuluhanComponent,
        UpdatePenyuluhanComponent,
        AddInfostatistikComponent,
        UpdateInfostatistikComponent,
        ViewInfostatistikComponent,
        MitrasComponent,
        AddMitraComponent,
        ViewMitraComponent,
        EditPendanaanComponent,
        CreatePendanaanComponent,
        BerandaComponent,
        AddBerandaComponent,
        ViewBerandaComponent,
        EditBerandaComponent,
        EditCouponsComponent,
        PenyuluhanMitraComponent,
        AddPenyuluhanMitraComponent,
        UpdateMitraComponent,
        PenyuluhanCodeComponent,
        AddCodeComponent,
        UpdateCodeComponent,
        CreateMitraIdComponent,
        BimtekComponent,
        AddBimtekComponent,
        ViewBimtekComponent,
        UpdateBimtekComponent,
        UpdateMitraIdComponent,
        UpdateProfileMitraComponent,
        DropZoneDirective,
        ImageUploadingComponent,
        ImageEditingComponent,
        EditingImageComponent,
        UploadingImageComponent
    ],
    providers: [
        AuthService,
        LoginService,
        {
            provide: CURRENCY_MASK_CONFIG,
            useValue: CustomCurrencyMaskConfig
        },
        UploadService,
        UploadLelangService,
        CategoryService,
        CatlelangService,
        BerandaService
    ],

    exports: [
        RouterModule,
        Ng2PaginationModule
    ]
})



export class PanelmedanModule {
}
