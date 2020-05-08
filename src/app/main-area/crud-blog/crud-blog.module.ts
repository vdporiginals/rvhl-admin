import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
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
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CrudBlogComponent } from './crud-blog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogDialogComponent } from './detail-dialog/blog-dialog.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogCategoryDialogComponent } from './blog-category/blog-category-dialog/blog-category-dialog.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CrudBlogComponent,
      },
      {
        path: 'category',
        component: BlogCategoryComponent,
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
    MatCheckboxModule,
    MatChipsModule,
    MatToolbarModule,
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
    AngularEditorModule,
    SharedModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
  ],
  declarations: [
    CrudBlogComponent,
    BlogDialogComponent,
    BlogCategoryComponent,
    BlogCategoryDialogComponent,
  ],
  exports: [FlexLayoutModule, RouterModule],
  providers: []
})
export class CrudBlogModule { }
