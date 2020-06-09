import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { MainAreaComponent } from './main-area.component';

const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: MainAreaComponent,
      },
      {
        path: 'user',
        component: CrudUserComponent,
        data: {
          breadcrumb: 'User'
        }
      },
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
        path: 'cho-o',
        loadChildren: () => import('./crud-estate/estate.module').then(m => m.EstateModule),
        data: {
          breadcrumb: 'Chỗ ở',
          count: ''
        }
      },
      {
        path: 'entertain',
        loadChildren: () => import('./crud-entertain/crud-entertain.module').then(m => m.CrudEntertainModule),
        data: {
          breadcrumb: 'Giải trí',
          count: ''
        }
      },
      {
        path: 'review',
        loadChildren: () => import('./crud-review/crud-review.module').then(m => m.CrudReviewModule),
        data: {
          breadcrumb: 'review',
          count: ''
        }
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./crud-restaurant/crud-restaurant.module').then(m => m.CrudRestaurantModule),
        data: {
          breadcrumb: 'Nhà hàng',
          count: ''
        }
      },
      {
        path: 'image',
        loadChildren: () => import('./image-control/image-control.module').then(m => m.ImageControlModule),
        data: {
          breadcrumb: 'Image',
          count: ''
        }
      },
      {
        path: 'customer-request',
        loadChildren: () => import('./customer-request/customer-request.module').then(m => m.CustomerRequestModule),
        data: {
          breadcrumb: 'Yêu cầu khách hàng',
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
