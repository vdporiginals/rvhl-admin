import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverflowPipe } from './pipe/overflow.pipe';
import { OnlyNumberDirective } from './only-num.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    OverflowPipe,
    OnlyNumberDirective
  ],
  exports: [OverflowPipe, OnlyNumberDirective],
  providers: [OverflowPipe, OnlyNumberDirective]
})
export class SharedModule { }
