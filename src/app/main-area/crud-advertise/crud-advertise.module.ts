import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CrudAdvertiseComponent } from './crud-advertise.component';
import { AdvertiseDialogComponent } from './detail-dialog/advertise-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CrudAdvertiseComponent,
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
    MatCheckboxModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    SharedModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
  ],
  declarations: [
    CrudAdvertiseComponent,
    AdvertiseDialogComponent,
  ],
  exports: [FlexLayoutModule, RouterModule],
  providers: []
})
export class CrudAdvertiseModule { }
