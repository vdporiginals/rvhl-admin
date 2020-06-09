import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageControlComponent } from './image-control.component';
import { CommonModule } from '@angular/common';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
const routes: Routes = [
    {
        path: '',
        component: ImageControlComponent,
    },
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes),
        SharedModule, FontAwesomeModule,
        ScrollingModule, NgxPaginationModule,
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        FlexLayoutModule,
    ],
    declarations: [ImageControlComponent, ImageDialogComponent],
    exports: [FlexLayoutModule, RouterModule],
    providers: []
})
export class ImageControlModule { }
