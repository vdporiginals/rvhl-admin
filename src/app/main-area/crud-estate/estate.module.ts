import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateRoutingModule } from './estate-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { EstateCategoryComponent } from '../crud-estate/estate-category/estate-category.component';
import { CategoryDialogComponent } from './estate-category/category-dialog/category-dialog.component';
import { HotelDialogComponent } from './hotel/hotel-dialog/hotel-dialog.component';
import { HomestayDialogComponent } from './homestay/homestay-dialog/homestay-dialog.component';
import { VillaDialogComponent } from './villa/villa-dialog/villa-dialog.component';
import { HomestayComponent } from './homestay/homestay.component';
import { VillaComponent } from './villa/villa.component';
import { HotelComponent } from './hotel/hotel.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        EstateRoutingModule,
        SharedModule,
        FlexLayoutModule,
        MatChipsModule,
        MatSelectModule,
        MatNativeDateModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        AngularEditorModule,
        MatToolbarModule,
        MatCheckboxModule,
    ],
    declarations: [EstateCategoryComponent,
        CategoryDialogComponent, HotelDialogComponent,
        HomestayComponent, VillaComponent, HotelComponent,
        HomestayDialogComponent, VillaDialogComponent],
    exports: [EstateRoutingModule, FlexLayoutModule, RouterModule],
    providers: []
})
export class EstateModule { }
