import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { CrudBlogComponent } from './crud-blog/crud-blog.component';
import { CrudAdvertiseComponent } from './crud-advertise/crud-advertise.component';
import { CrudTourComponent } from './crud-tour/crud-tour.component';
import { MainAreaComponent } from './main-area.component';

const routes: Routes = [
  {
    path: '',
    component: MainAreaComponent,
    children: [
      {
        path: 'user',
        component: CrudUserComponent,
        data: {
          breadcrumb: 'User'
        }
      },
      {
        path: 'blogs',
        component: CrudBlogComponent,
        data: {
          breadcrumb: 'Blogs',
          count: ''
        }
      },
      {
        path: 'advertises',
        component: CrudAdvertiseComponent,
        data: {
          breadcrumb: 'Advertises',
          count: ''
        }
      },
      {
        path: 'tour',
        component: CrudTourComponent,
        data: {
          breadcrumb: 'Tour',
          count: ''
        }
      }
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAreaRoutingModule { }
