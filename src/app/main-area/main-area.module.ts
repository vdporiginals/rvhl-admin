import { NgModule } from '@angular/core';
import { MainAreaRoutingModule } from './main-area-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    RouterModule,
    MainAreaRoutingModule,
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [],
  exports: [MainAreaRoutingModule, FlexLayoutModule, RouterModule],
  providers: []
})
export class MainAreaModule { }
