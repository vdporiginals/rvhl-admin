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
      // {
      //   path: 'user',
      //   component: CrudUserComponent,
      //   data: {
      //     breadcrumb: 'User'
      //   }
      // },
      {
        path: 'blog',
        loadChildren: () => import('./crud-blog/crud-blog.module').then(m => m.CrudBlogModule),
        data: {
          breadcrumb: 'Blogs',
          count: ''
        }
      },
      {
        path: 'advertise',
        loadChildren: () => import('./crud-advertise/crud-advertise.module').then(m => m.CrudAdvertiseModule),
        data: {
          breadcrumb: 'Advertises',
          count: ''
        }
      },
      {
        path: 'tour',
        loadChildren: () => import('./crud-tour/crud-tour.module').then(m => m.CrudTourModule),
        data: {
          breadcrumb: 'Tour',
          count: ''
        }
      },
      {
        path: 'category',
        loadChildren: () => import('./crud-category/crud-category.module').then(m => m.CrudCategoryModule),
        data: {
          breadcrumb: 'Category',
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
