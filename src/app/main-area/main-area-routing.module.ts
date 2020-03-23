import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrudUserComponent } from './crud-user/crud-user.component';

const routes: Routes = [{ path: 'user', component: CrudUserComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainAreaRoutingModule {}
