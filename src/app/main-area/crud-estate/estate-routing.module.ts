import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EstateCategoryComponent } from './estate-category/estate-category.component';
import { HotelComponent } from './hotel/hotel.component';
import { VillaComponent } from './villa/villa.component';
import { HomestayComponent } from './homestay/homestay.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'category'
            },
            {
                path: 'category',
                component: EstateCategoryComponent,
                data: {
                    breadcrumb: 'category'
                }
            },
            {
                path: 'hotel',
                component: HotelComponent,
                data: {
                    breadcrumb: 'hotel'
                }
            },
            {
                path: 'villa',
                component: VillaComponent,
                data: {
                    breadcrumb: 'villa'
                }
            },
            {
                path: 'homestay',
                component: HomestayComponent,
                data: {
                    breadcrumb: 'homestay'
                }
            },
        ]
    },

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EstateRoutingModule { }
