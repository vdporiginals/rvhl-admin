import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAreaComponent } from './main-area/main-area.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './layout/login/login.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./main-area/main-area.module').then(m => m.MainAreaModule)
    , canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
