import { NgModule } from '@angular/core';
import { EstateRoutingModule } from './estate-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EstateCategoryComponent } from '../crud-estate/estate-category/estate-category.component';
import { CategoryDialogComponent } from './estate-category/category-dialog/category-dialog.component';
import { HotelDialogComponent } from './hotel/hotel-dialog/hotel-dialog.component';
import { HomestayDialogComponent } from './homestay/homestay-dialog/homestay-dialog.component';
import { VillaDialogComponent } from './villa/villa-dialog/villa-dialog.component';
@NgModule({
    imports: [
        RouterModule,
        EstateRoutingModule,
        SharedModule,
        FlexLayoutModule,
    ],
    declarations: [EstateCategoryComponent, CategoryDialogComponent, HotelDialogComponent, HomestayDialogComponent, VillaDialogComponent],
    exports: [EstateRoutingModule, FlexLayoutModule, RouterModule],
    providers: []
})
export class EstateModule { }
