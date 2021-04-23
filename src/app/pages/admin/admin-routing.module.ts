import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RoutesAuthenticationService } from '../../authentication/services/authentication/routes-authentication.service';
import { AdminStaffDashboardComponent } from './admin-staff-dashboard/admin-staff-dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [RoutesAuthenticationService] },
      { path: 'dashboard_admin_staff', component: AdminStaffDashboardComponent, canActivate: [RoutesAuthenticationService] }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
