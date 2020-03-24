import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MainAreaRoutingModule } from './main-area-routing.module';

@NgModule({
  imports: [CommonModule, MainAreaRoutingModule],
  declarations: [],
  exports: [MainAreaRoutingModule],
  providers: []
})
export class MainAreaModule {}
