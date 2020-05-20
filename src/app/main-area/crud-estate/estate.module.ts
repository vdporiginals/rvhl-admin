import { NgModule } from '@angular/core';
import { EstateRoutingModule } from './estate-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EstateCategoryComponent } from '../crud-estate/estate-category/estate-category.component';
@NgModule({
    imports: [
        RouterModule,
        EstateRoutingModule,
        SharedModule,
        FlexLayoutModule,
    ],
    declarations: [EstateCategoryComponent],
    exports: [EstateRoutingModule, FlexLayoutModule, RouterModule],
    providers: []
})
export class EstateModule { }
