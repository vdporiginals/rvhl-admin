import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { CrudBlogComponent } from './crud-blog/crud-blog.component';
import { CrudAdvertiseComponent } from './crud-advertise/crud-advertise.component';
import { CrudTourComponent } from './crud-tour/crud-tour.component';

const routes: Routes = [
  {
    path: 'user',
    component: CrudUserComponent,
    data: {
      breadcrumb: 'User'
    },
    children: [
      {
        path: ':id',
        component: CrudUserComponent,
        data: {
          breadcrumb: ''
        }
      }
    ]
  },
  {
    path: 'blogs',
    component: CrudBlogComponent,
    data: {
      breadcrumb: 'Blogs',
      count: ''
    },
    children: [
      {
        path: ':id',
        component: CrudBlogComponent,
        data: {
          breadcrumb: '',
          count: ''
        }
      }
    ]
  },
  {
    path: 'advertises',
    component: CrudAdvertiseComponent,
    data: {
      breadcrumb: 'Advertises',
      count: ''
    },
    children: [
      {
        path: ':id',
        component: CrudAdvertiseComponent,
        data: {
          breadcrumb: ''
        }
      }
    ]
  },
  {
    path: 'tour',
    component: CrudTourComponent,
    data: {
      breadcrumb: 'Tour',
      count: ''
    },
    children: [
      {
        path: ':id',
        component: CrudTourComponent,
        data: {
          breadcrumb: ''
        }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainAreaRoutingModule { }
