import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminStaffDashboardComponent } from './admin-staff-dashboard/admin-staff-dashboard.component';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, AdminStaffDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ThemeModule
  ]
})
export class AdminModule { }
