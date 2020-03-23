import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
// import {
//   MatSidenavModule,
//   MatIconModule,
//   MatButtonModule,
//   MatTabsModule,
//   MatListModule,
//   MatCardModule,
//   MatInputModule,
//   MatPaginatorModule,
//   MatMenuModule
// } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
