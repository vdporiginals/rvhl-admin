import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { CrudTourComponent } from './crud-tour.component';
import { TourDialogComponent } from './detail-dialog/tour-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TourCategoryComponent } from './tour-category/tour-category.component';
import { TourCategoryDialogComponent } from './tour-category/tour-category-dialog/tour-category-dialog.component';
import { CrudTransferComponent } from './crud-transfer/crud-transfer.component';
import { TransferDialogComponent } from './crud-transfer/transfer-dialog/transfer-dialog.component';
import { TransferCategoryComponent } from './crud-transfer/transfer-category/transfer-category.component';
import { TransferCategoryDialogComponent } from './crud-transfer/transfer-category/transfer-category-dialog/transfer-category-dialog.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CrudTourComponent
      },
      {
        path: 'category',
        component: TourCategoryComponent,
        data: {
          breadcrumb: 'Danh mục',
          count: ''
        }
      },
    ]
  },
  {
    path: 'transfer',
    children: [
      {
        path: '',
        component: CrudTransferComponent
      },
      {
        path: 'category',
        component: TransferCategoryComponent,
        data: {
          breadcrumb: 'Danh mục',
          count: ''
        }
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AngularEditorModule,
    MatCheckboxModule,
    MatToolbarModule,
    NgxMaterialTimepickerModule,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
  ],
  declarations: [
    CrudTourComponent,
    TourDialogComponent,
    TourCategoryComponent,
    TourCategoryDialogComponent,
    CrudTransferComponent,
    TransferDialogComponent,
    TransferCategoryComponent,
    TransferCategoryDialogComponent,
  ],
  exports: [FlexLayoutModule, RouterModule],
  providers: []
})
export class CrudTourModule { }
