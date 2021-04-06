import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPortalComponent } from './student-portal.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { RoutesAuthenticationService } from 'app/authentication/services/authentication/routes-authentication.service';
import { MySchedulesComponent } from './my-schedules/my-schedules.component';
import { MyClassComponent } from './my-class/my-class.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

const routes: Routes = [
  {
    path: '', component: StudentPortalComponent,
    children: [
      { path: 'dashboard', component: StudentDashboardComponent, canActivate: [RoutesAuthenticationService] },
      { path: 'my_schedules', component: MySchedulesComponent, canActivate: [RoutesAuthenticationService] },
      { path: 'my_class/:lectureId', component: MyClassComponent, canActivate: [RoutesAuthenticationService] },
      { path: 'my_payments', component: MyPaymentsComponent },
      { path: 'payment_history', component: PaymentHistoryComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPortalRoutingModule { }
