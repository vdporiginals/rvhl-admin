import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverflowPipe } from './pipe/overflow.pipe';
import { OnlyNumberDirective } from './only-num.directive';
import { SanitizeHtmlPipe } from './pipe/html-sanitize.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    OverflowPipe,
    OnlyNumberDirective,
    SanitizeHtmlPipe
  ],
  exports: [OverflowPipe, SanitizeHtmlPipe, OnlyNumberDirective],
  providers: [OverflowPipe, SanitizeHtmlPipe, OnlyNumberDirective]
})
export class SharedModule { }
