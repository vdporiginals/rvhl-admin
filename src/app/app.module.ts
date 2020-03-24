import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainAreaModule } from './main-area/main-area.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './main-area/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    MainAreaComponent,
    LayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MainAreaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
