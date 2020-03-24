import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MainAreaRoutingModule } from './main-area-routing.module';
import { CrudAdvertiseComponent } from './crud-advertise/crud-advertise.component';
import { CrudBlogComponent } from './crud-blog/crud-blog.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { CrudTourComponent } from './crud-tour/crud-tour.component';

@NgModule({
  imports: [CommonModule, MainAreaRoutingModule, MaterialModule],
  declarations: [CrudAdvertiseComponent, CrudBlogComponent, CrudUserComponent, CrudTourComponent],
  exports: [MainAreaRoutingModule, MaterialModule],
  providers: []
})
export class MainAreaModule {}
