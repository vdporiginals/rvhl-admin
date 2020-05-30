import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { CommentComponent } from './comment/comment.component';
import { CheckRoomComponent } from './check-room/check-room.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'check-room'
            },
            {
                path: 'check-room',
                component: CheckRoomComponent,
                data: {
                    breadcrumb: 'Check room',
                    count: ''
                }
            },
            {
                path: 'comment',
                component: CommentComponent,
                data: {
                    breadcrumb: 'Comment',
                    count: ''
                }
            },
        ]
    },
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatProgressSpinnerModule,
        SharedModule,
        RouterModule.forChild(routes),
        FlexLayoutModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
    ],
    declarations: [CommentComponent, CheckRoomComponent],
    exports: [FlexLayoutModule, RouterModule],
    providers: []
})
export class CustomerRequestModule { }
