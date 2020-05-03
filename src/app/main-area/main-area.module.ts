import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainAreaRoutingModule } from './main-area-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CrudAdvertiseComponent } from './crud-advertise/crud-advertise.component';
import { CrudBlogComponent } from './crud-blog/crud-blog.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { CrudTourComponent } from './crud-tour/crud-tour.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdvertiseDialogComponent } from './crud-advertise/detail-dialog/advertise-dialog.component';
import { BlogDialogComponent } from './crud-blog/detail-dialog/blog-dialog.component';
import { TourDialogComponent } from './crud-tour/detail-dialog/tour-dialog.component';
import { MainAreaComponent } from './main-area.component';
import { AuthInterceptor } from '../shared/interceptor/auth.interceptor';
import { OverflowPipe } from '../shared/pipe/overflow.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MainAreaRoutingModule,
    CKEditorModule,
    FlexLayoutModule,
  ],
  declarations: [
    MainAreaComponent,
    CrudAdvertiseComponent,
    CrudBlogComponent,
    CrudUserComponent,
    CrudTourComponent,
    AdvertiseDialogComponent,
    BlogDialogComponent,
    TourDialogComponent, OverflowPipe
  ],
  exports: [MainAreaRoutingModule, FlexLayoutModule, RouterModule],
  providers: [OverflowPipe
  ]
})
export class MainAreaModule { }
