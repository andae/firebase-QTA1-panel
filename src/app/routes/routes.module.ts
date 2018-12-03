import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { HomeModule } from './home/home.module';
import { HomesModule } from './homes/home.module';
import { PanelmedanModule } from './panel-medan/panelmedan.module';

import { menu } from './menu';
import { routes } from './routes';

@NgModule({
    imports: [
        SharedModule,
        // RouterModule.forRoot(routes),
        [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
        PagesModule,
        PanelmedanModule,
        HomeModule,
        HomesModule

    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(private menuService: MenuService) {
        menuService.addMenu(menu);
    }
}
