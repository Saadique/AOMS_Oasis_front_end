import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPortalComponent } from './student-portal.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { RoutesAuthenticationService } from 'app/authentication/services/authentication/routes-authentication.service';
import { MySchedulesComponent } from './my-schedules/my-schedules.component';
import { MyClassComponent } from './my-class/my-class.component';

const routes: Routes = [
  {
    path: '', component: StudentPortalComponent,
    children: [
      { path: 'dashboard', component: StudentDashboardComponent, canActivate: [RoutesAuthenticationService] },
      { path: 'my_schedules', component: MySchedulesComponent, canActivate: [RoutesAuthenticationService] },
      { path: 'my_class/:lectureId', component: MyClassComponent, canActivate: [RoutesAuthenticationService] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPortalRoutingModule { }
