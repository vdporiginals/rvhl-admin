import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainAreaRoutingModule } from './main-area-routing.module';
import { CrudAdvertiseComponent } from './crud-advertise/crud-advertise.component';
import { CrudBlogComponent } from './crud-blog/crud-blog.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { CrudTourComponent } from './crud-tour/crud-tour.component';
import { HttpClientModule } from '@angular/common/http';
import { AdvertiseDialogComponent } from './crud-advertise/detail-dialog/advertise-dialog.component';
import { BlogDialogComponent } from './crud-blog/detail-dialog/blog-dialog.component';
import { TourDialogComponent } from './crud-tour/detail-dialog/tour-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainAreaRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [
    CrudAdvertiseComponent,
    CrudBlogComponent,
    CrudUserComponent,
    CrudTourComponent,
    AdvertiseDialogComponent,
    BlogDialogComponent,
    TourDialogComponent
  ],
  exports: [MainAreaRoutingModule, MaterialModule],
  providers: []
})
export class MainAreaModule { }
