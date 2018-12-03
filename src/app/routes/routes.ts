import {NgModule} from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { Error404Component } from './pages/error404/error404.component';

import { HomeComponent } from './home/home/home.component';

import { HomesComponent } from './homes/home/home.component';

import {CategoriesComponent} from './panel-medan/categories/categories.component';
import {AddCategoriesComponent} from './panel-medan/categories/add-categories/add-categories.component';
import {CatlelangComponent} from './panel-medan/catlelang/catlelang.component';
import {AddCatlelangComponent} from './panel-medan/catlelang/add-catlelang/add-catlelang.component';
import {MenuItemsComponent} from './panel-medan/menu-items/menu-items.component';
import {AddItemComponent} from './panel-medan/menu-items/add-item/add-item.component';
import { ImageUploadingComponent } from './panel-medan/menu-items/image-uploading/image-uploading.component';
import { ImageEditingComponent } from './panel-medan/menu-items/image-editing/image-editing.component';

import {MenusItemsComponent} from './panel-medan/menus-items/menus-items.component';
import {AddItemsComponent} from './panel-medan/menus-items/add-items/add-item.component';
import { EditingImageComponent } from './panel-medan/menus-items/editing-image/editing-image.component';
import { UploadingImageComponent } from './panel-medan/menus-items/uploading-image/uploading-image.component';


// import {LelangItemxComponent} from './panel-medan/lelang-itemx/lelang-itemx.component';
// import {AddItemxComponent} from './panel-medan/lelang-itemx/add-itemx/add-itemx.component';
import {OrdersComponent} from './panel-medan/orders/orders.component';
import {ViewOrderComponent} from './panel-medan/orders/view-order/view-order.component';

import {OrderlComponent} from './panel-medan/orderl/orderl.component';
import {ViewOrderlComponent} from './panel-medan/orderl/view-orderl/view-order.component';


 import {UsersComponent} from './panel-medan/users/users.component';
 import {AddUserComponent} from './panel-medan/users/add-user/add-user.component'; 
 import {ViewUserComponent} from './panel-medan/users/view-user/view-users.component';

import {SettingsComponent} from './panel-medan/settings/settings.component';

import { ChatComponent } from './panel-medan/chat/chat.component';

import {TagsComponent} from './panel-medan/tags/tags.component';
import {EditTagesComponent} from './panel-medan/tags/edit-tages/edit-tages.component';
import {AddTagsComponent} from './panel-medan/tags/add-tags/add-tags.component';
import {BusinessInfoComponent} from './panel-medan/business-info/business-info.component';
import {ProfileComponent} from './panel-medan/profile/profile.component';
import {EditCategoryComponent} from './panel-medan/categories/edit-category/edit-category.component';
import {ViewCategoryComponent} from './panel-medan/categories/view-category/view-category.component';
import {EditCatlelangComponent} from './panel-medan/catlelang/edit-catlelang/edit-catlelang.component';
import {ViewCatlelangComponent} from './panel-medan/catlelang/view-catlelang/view-catlelang.component';
import {ViewItemComponent} from './panel-medan/menu-items/view-item/view-item.component';
import {EditItemComponent} from './panel-medan/menu-items/edit-item/edit-item.component';

import {ViewItemsComponent} from './panel-medan/menus-items/view-items/view-item.component';
import {EditItemsComponent} from './panel-medan/menus-items/edit-items/edit-item.component';

// import {ViewItemxComponent} from './panel-medan/lelang-itemx/view-itemx/view-itemx.component';
// import {EditItemxComponent} from './panel-medan/lelang-itemx/edit-itemx/edit-itemx.component';
import {NewsComponent} from './panel-medan/news/news.component';
import {AddNewsComponent} from './panel-medan/news/add-news/add-news.component';
import {EditNewsComponent} from './panel-medan/news/edit-news/edit-news.component';
import {ViewNewsComponent} from './panel-medan/news/view-news/view-news.component';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {FileUploadModule} from 'ng2-file-upload';
import {AuthService} from './pages/login/auth.service';
import {LoginService} from './pages/login/login.service';
import {Ng2PaginationModule} from 'ng2-pagination';

import { Ng2TableModule } from 'ng2-table/ng2-table';


import {CouponsComponent} from './panel-medan/coupons/coupons.component';
import {AddCouponsComponent} from './panel-medan/coupons/add-coupons/add-coupons.component';
import { EditCouponsComponent } from './panel-medan/coupons/edit-coupons/edit-coupons.component';

import {LoyalitysComponent} from './panel-medan/loyalitys/loyalitys.component';
import { PushNotificationComponent } from './panel-medan/push-notification/push-notification.component';

import { SubscribersComponent } from './panel-medan/subscribers/subscribers.component';
import { TableBookingComponent } from './panel-medan/table-booking/table-booking.component';
import { ViewComponent } from './panel-medan/table-booking/view/view.component';
import { DeliveryOptionsComponent } from './panel-medan/delivery-options/delivery-options.component';
import { InvoiceComponent } from './panel-medan/orders/invoice/invoice.component';

import { ArtikelKategoriComponent } from './panel-medan/artikel-kategori/artikel-kategori.component';
import { UpdateKatartikelComponent } from './panel-medan/artikel-kategori/update-katartikel/update-katartikel.component';
import { AddKatartikelComponent } from './panel-medan/artikel-kategori/add-katartikel/add-katartikel.component';

import { ArtikelComponent } from './panel-medan/artikel/artikel.component';
import { ViewArtikelsComponent } from './panel-medan/artikel/view-artikels/view-artikels.component';
import { UpdateArtikelsComponent } from './panel-medan/artikel/update-artikels/update-artikels.component';
import { AddArtikelsComponent } from './panel-medan/artikel/add-artikels/add-artikels.component';

import { DiskusiKategoriComponent } from './panel-medan/diskusi-kategori/diskusi-kategori.component';
import { AddKatdiskusiComponent } from './panel-medan/diskusi-kategori/add-katdiskusi/add-katdiskusi.component';
import { UpdateKatdiskusiComponent } from './panel-medan/diskusi-kategori/update-katdiskusi/update-katdiskusi.component';

import { DiskusiComponent } from './panel-medan/diskusi/diskusi.component';
import { AddDiskusisComponent } from './panel-medan/diskusi/add-diskusis/add-diskusis.component';
import { UpdateDiskusisComponent } from './panel-medan/diskusi/update-diskusis/update-diskusis.component';
import { ViewDiskusisComponent } from './panel-medan/diskusi/view-diskusis/view-diskusis.component';

import { PenyuluhanComponent } from './panel-medan/penyuluhan/penyuluhan.component';
import { AddPenyuluhanComponent } from './panel-medan/penyuluhan/add-penyuluhan/add-penyuluhan.component';
import { UpdatePenyuluhanComponent } from './panel-medan/penyuluhan/update-penyuluhan/update-penyuluhan.component';
import { ViewPenyuluhanComponent } from './panel-medan/penyuluhan/view-penyuluhan/view-penyuluhan.component';
import { PenyuluhanMitraComponent } from './panel-medan/penyuluhan/penyuluhan-mitra/penyuluhan-mitra.component';
import { AddPenyuluhanMitraComponent } from './panel-medan/penyuluhan/penyuluhan-mitra/add-mitra/add-mitra.component';
import { UpdateMitraComponent } from './panel-medan/penyuluhan/penyuluhan-mitra/update-mitra/update-mitra.component';
import { PenyuluhanCodeComponent } from './panel-medan/penyuluhan/penyuluhan-code/penyuluhan-code.component';
import { AddCodeComponent } from './panel-medan/penyuluhan/penyuluhan-code/add-code/add-code.component';
import { UpdateCodeComponent } from './panel-medan/penyuluhan/penyuluhan-code/update-code/update-code.component';

import { BimtekComponent } from './panel-medan/bimtek/bimtek.component';
import { AddBimtekComponent } from './panel-medan/bimtek/add-bimtek/add-bimtek.component';
import { UpdateBimtekComponent } from './panel-medan/bimtek/update-bimtek/update-bimtek.component';
import { ViewBimtekComponent } from './panel-medan/bimtek/view-bimtek/view-bimtek.component';

import { InfostatistikComponent } from './panel-medan/infostatistik/infostatistik.component';
import { AddInfostatistikComponent } from './panel-medan/infostatistik/add-infostatistik/add-infostatistik.component';
import { UpdateInfostatistikComponent } from './panel-medan/infostatistik/update-infostatistik/update-infostatistik.component';
import { ViewInfostatistikComponent } from './panel-medan/infostatistik/view-infostatistik/view-infostatistik.component';

// import { PenyuluhanBulanComponent } from './panel-medan/penyuluhan-bulan/penyuluhan-bulan.component';
// import { AddBulanComponent } from './panel-medan/penyuluhan-bulan/add-bulan/add-bulan.component';

import { MitrasComponent } from './panel-medan/mitras/mitras.component';
import { ViewMitraComponent } from './panel-medan/mitras/view-mitra/view-mitra.component';
import { AddMitraComponent } from './panel-medan/mitras/add-mitra/add-mitra.component';
import { EditPendanaanComponent } from './panel-medan/mitras/edit-pendanaan/edit-pendanaan.component';
import { CreatePendanaanComponent } from './panel-medan/mitras/create-pendanaan/create-pendanaan.component';
import { CreateMitraIdComponent } from './panel-medan/mitras/create-mitra-id/create-mitra-id.component';
import { UpdateMitraIdComponent } from './panel-medan/mitras/update-mitra-id/update-mitra-id.component';
import { UpdateProfileMitraComponent } from './panel-medan/mitras/update-profile-mitra/update-profile-mitra.component';

import { BerandaComponent } from './panel-medan/beranda/beranda.component';
import { AddBerandaComponent } from './panel-medan/beranda/add-beranda/add-beranda.component';
import { EditBerandaComponent } from './panel-medan/beranda/edit-beranda/edit-beranda.component';


export const routes = [
    
    {path: '', component: LoginComponent, useAsDefault: true},
    {path: 'login', component: LoginComponent},

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent, canActivate: [AuthService]},
            { path: 'pushNotification', component: PushNotificationComponent, canActivate: [AuthService]},

            { path: 'homes', component: HomesComponent, canActivate: [AuthService]},
            { path: 'pushNotification', component: PushNotificationComponent, canActivate: [AuthService]},    
           


            {
                path: 'coupons',
                children: [
                    {path: 'all', component: CouponsComponent, canActivate: [AuthService]},
                    {path: 'addCoupons', component: AddCouponsComponent, canActivate: [AuthService]},
                    {path: 'editCoupons/:id', component: EditCouponsComponent, canActivate: [AuthService]}
                    
               ]
            },
        
            {
                path: 'categories',
                children: [
                    {path: 'manageCategories', component: CategoriesComponent, canActivate: [AuthService]},
                    {path: 'addCategory', component: AddCategoriesComponent, canActivate: [AuthService]},
                    {path: 'editCategory/:id', component: EditCategoryComponent, canActivate: [AuthService]},
                    {path: 'viewCategory/:id', component: ViewCategoryComponent, canActivate: [AuthService]}
                ]
            },

            {
                path: 'catlelang',
                children: [
                    {path: 'manageCatlelang', component: CatlelangComponent, canActivate: [AuthService]},
                    {path: 'addCatlelang', component: AddCatlelangComponent, canActivate: [AuthService]},
                    {path: 'editCatlelang/:id', component: EditCatlelangComponent, canActivate: [AuthService]},
                    {path: 'viewCatlelang/:id', component: ViewCatlelangComponent, canActivate: [AuthService]}
                ]
            }, 

           {
                path: 'news',
               children: [
                    {path: 'manageNews', component: NewsComponent, canActivate: [AuthService]},
                    {path: 'addNews', component: AddNewsComponent, canActivate: [AuthService]},
                    {path: 'editNews/:id', component: EditNewsComponent, canActivate: [AuthService]},
                   {path: 'viewNews/:id', component: ViewNewsComponent, canActivate: [AuthService]}
                ]
            },

            {
                path: 'artikels',
                children: [
                    {path: 'manageArtikels', component: ArtikelComponent, canActivate: [AuthService]},
                    {path: 'addArtikels', component: AddArtikelsComponent, canActivate: [AuthService]},
                    {path: 'updateArtikels/:id', component: UpdateArtikelsComponent, canActivate: [AuthService]},
                    {path: 'viewArtikels/:id', component: ViewArtikelsComponent, canActivate: [AuthService]}
                ]
            },

            {
                path: 'artikelkategoris',
                children: [
                    {path: 'manageArtikelkategoris', component: ArtikelKategoriComponent, canActivate: [AuthService]},
                    {path: 'addArtikelkategori', component: AddKatartikelComponent, canActivate: [AuthService]},
                    {path: 'updateKategoriartikel/:id', component: UpdateKatartikelComponent, canActivate: [AuthService]}
                ]
            },

            {
                path: 'diskusis',
                children: [
                    {path: 'manageDiskusis', component: DiskusiComponent, canActivate: [AuthService]},
                    {path: 'addDiskusis', component: AddDiskusisComponent, canActivate: [AuthService]},
                    {path: 'updateDiskusis/:id', component: UpdateDiskusisComponent, canActivate: [AuthService]},
                    {path: 'viewDiskusis/:id', component: ViewDiskusisComponent, canActivate: [AuthService]}
                ]
            },

            {
                path: 'diskusikategoris',
                children: [
                    {path: 'manageDiskusikategoris', component: DiskusiKategoriComponent, canActivate: [AuthService]},
                    {path: 'addDiskusikategori', component: AddKatdiskusiComponent, canActivate: [AuthService]},
                    {path: 'updateKategoridiskusi/:id', component: UpdateKatdiskusiComponent, canActivate: [AuthService]}
                ]
            },

            {
                path: 'bimteks',
                children: [
                    {path: 'manageBimtek', component: PenyuluhanComponent, canActivate: [AuthService]},
                    {path: 'addBimtek', component: AddPenyuluhanComponent, canActivate: [AuthService]},
                    {path: 'updateBimtek/:id', component: UpdatePenyuluhanComponent, canActivate: [AuthService]},
                    {path: 'viewBimtek/:id', component: ViewPenyuluhanComponent, canActivate: [AuthService]},
                    {
                        path: 'mitra', component: PenyuluhanMitraComponent, canActive: [ AuthService ]
                    },
                    {
                        path: 'add-mitra', component: AddPenyuluhanMitraComponent, canActive: [ AuthService ]
                    },
                    {
                        path: 'update-mitra/:id', component: UpdateMitraComponent, canActive: [ AuthService ]
                    },
                    {
                        path: 'codemitra', component: PenyuluhanCodeComponent, canActive: [ AuthService ]
                    },
                    {
                        path: 'add-codemitra', component: AddCodeComponent, canActive: [ AuthService ]
                    },
                    {
                        path: 'update-codemitra/:id', component: UpdateCodeComponent, canActive: [ AuthService ]
                    }
                ]
            },

            {
                path: 'penyuluhans',
                children: [
                    {
                        path: 'managePenyuluhan', component: BimtekComponent, canActivate: [AuthService]
                    },
                    {
                        path: 'add-penyuluhan', component: AddBimtekComponent, canActivate: [AuthService]
                    },
                    {
                        path: 'update-penyuluhan/:id', component: UpdateBimtekComponent, canActivate: [AuthService]
                    },
                    {
                        path: 'view-penyuluhan/:id', component: ViewBimtekComponent, canActivate: [AuthService]
                    }
                ]
            },

            {
                path: 'infostatistis',
                children: [
                    {path: 'manageInfostatistiks', component: InfostatistikComponent, canActivate: [AuthService]},
                    {path: 'addInfostatistiks', component: AddInfostatistikComponent, canActivate: [AuthService]},
                    {path: 'updateInfostatistiks/:id', component: UpdateInfostatistikComponent, canActivate: [AuthService]},
                    {path: 'viewInfostatistiks/:id', component: ViewInfostatistikComponent, canActivate: [AuthService]}
                ]
            },

            {
                path: 'order',
                children: [
                    {path: 'allOrder', component: OrdersComponent, canActivate: [AuthService]},
                    {path: 'viewOrder/:id', component: ViewOrderComponent, canActivate: [AuthService]},
                    {path: 'invoice/:id', component: InvoiceComponent, canActivate: [AuthService]},
                ]
            },

            {
                path: 'orderl',
                children: [
                    {path: 'allOrder', component: OrderlComponent, canActivate: [AuthService]},
                    {path: 'viewOrder/:id', component: ViewOrderlComponent, canActivate: [AuthService]},
                    {path: 'invoice/:id', component: InvoiceComponent, canActivate: [AuthService]},
                ]
            },

            {
                path: 'beranda',
                children: [
                    {
                        path: 'manageBeranda', component: BerandaComponent, canActivate: [AuthService]
                    },
                    {
                        path: 'addBeranda', component: AddBerandaComponent, canActivate: [AuthService]
                    },
                    {
                        path: 'editBeranda/:id', component: EditBerandaComponent, canActivate: [AuthService]
                    }
                ]
            },

            {
                path: 'menu',
                children: [
                    {path: 'manageItems', component: MenuItemsComponent, canActivate: [AuthService]},
                    {path: 'addItems', component: AddItemComponent, canActivate: [AuthService]},
                    { 
                        path: 'upload-image/:id',
                        component: ImageUploadingComponent,
                        canActivate: [ AuthService ]
                    },
                    {
                        path: 'editing-image/:id',
                        component: ImageEditingComponent,
                        canActivate: [ AuthService ]
                    },
                    {path: 'viewItems/:id', component: ViewItemComponent, canActivate: [AuthService]},
                    {path: 'editItems/:id', component: EditItemComponent, canActivate: [AuthService]},

                ]
            },
            {
                path: 'menus',
                children: [
                    {path: 'manageItems', component: MenusItemsComponent, canActivate: [AuthService]},
                    {path: 'addItems', component: AddItemsComponent, canActivate: [AuthService]},
                    {path: 'viewItems/:id', component: ViewItemsComponent, canActivate: [AuthService]},
                    {path: 'editItems/:id', component: EditItemsComponent, canActivate: [AuthService]},
                    {
                        path: 'editing-image/:id',
                        component: EditingImageComponent,
                        canActivate: [ AuthService ]
                    },
                    {
                        path: 'uploading-image/:id',
                        component: UploadingImageComponent,
                        canActivate: [ AuthService ]
                    }
                ]
            },

            // {
            //     path: 'lelang',
            //     children: [
            //         {path: 'manageItemx', component: LelangItemxComponent, canActivate: [AuthService]},
            //         {path: 'addItemx', component: AddItemxComponent, canActivate: [AuthService]},
            //         {path: 'viewItemx/:id', component: ViewItemxComponent, canActivate: [AuthService]},
            //         {path: 'editItemx/:id', component: EditItemxComponent, canActivate: [AuthService]},

            //     ]
            // },

            {
                path: 'users',
                children: [
                   { path: 'manageUsers', component: UsersComponent, canActivate: [AuthService] },
                   { path: 'addUser', component: AddUserComponent, canActivate: [AuthService] },
                   { path: 'viewUser/:id', component: ViewUserComponent, canActivate: [AuthService] }

                ]
            },

            {
                path: 'mitras',
                children: [
                   { path: 'manageMitras', component: MitrasComponent, canActivate: [AuthService] },
                   { path: 'addMitra', component: AddMitraComponent, canActivate: [AuthService] },
                   { path: 'viewMitra/:id', component: ViewMitraComponent, canActivate: [AuthService] },
                   { path: 'editPendanaan/:id', component: EditPendanaanComponent, canActivate: [AuthService] },
                   { path: 'createPendanaan/:id', component: CreatePendanaanComponent, canActivate: [AuthService] },
                   { path: 'createMitraId/:id', component: CreateMitraIdComponent, canActivate: [AuthService] },
                   { path: 'updateMitraId/:id', component: UpdateMitraIdComponent, canActivate: [AuthService] },
                   { path: 'updateprofileMitraId/:id', component: UpdateProfileMitraComponent, canActivate: [AuthService] }
                ]
            },

            {
                path: 'tags',
                children: [
                    {path: 'all', component: TagsComponent, canActivate: [AuthService]},
                    {path: 'addTags', component: AddTagsComponent, canActivate: [AuthService]},
                    {path: 'editTags/:id', component: EditTagesComponent, canActivate: [AuthService]}
                ]

            },
            
            {path: 'chat', component: ChatComponent, canActivate: [AuthService]},

            {path: 'setting', component: SettingsComponent, canActivate: [AuthService]},
            
            {path: 'loyalty', component: LoyalitysComponent, canActivate: [AuthService]},

            {path: 'businessInfo', component: BusinessInfoComponent, canActivate: [AuthService]},

            {path: 'UserProfile', component: ProfileComponent, canActivate: [AuthService]},

            {path: 'delivery/options', component: DeliveryOptionsComponent, canActivate: [AuthService]},

            {path: 'subscribers', component: SubscribersComponent, canActivate: [AuthService]},
            
            {path: 'tables/booking', component: TableBookingComponent, canActivate: [AuthService]},
            
            {path: 'tables/view/:id', component: ViewComponent, canActivate: [AuthService]}
  

        ] // children End
    },

    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: '404', component: Error404Component },

    // Not found
    { path: '**', redirectTo: '404' }

];

@NgModule({ 
providers: [
        
        AuthService,
        LoginService
    ]
})
class RestModule {
}
