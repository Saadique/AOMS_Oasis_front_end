import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RoutesAuthenticationService } from '../../authentication/services/authentication/routes-authentication.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [RoutesAuthenticationService] }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
