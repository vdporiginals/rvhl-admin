import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommentComponent } from './comment/comment.component';
import { CheckRoomComponent } from './check-room/check-room.component';
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
        RouterModule,
        SharedModule,
        RouterModule.forChild(routes),
        FlexLayoutModule,
    ],
    declarations: [CommentComponent, CheckRoomComponent],
    exports: [FlexLayoutModule, RouterModule],
    providers: []
})
export class CustomerRequestModule { }
