import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { CreatePaymentSchemeComponent } from './create-payment-scheme/create-payment-scheme.component';
import { RoutesAuthenticationService } from 'app/authentication/services/authentication/routes-authentication.service';

const routes: Routes = [
  {
    path: '', component: StudentComponent,
    children: [
      { path: 'register', component: RegisterStudentComponent, canActivate: [RoutesAuthenticationService], },
      { path: 'view', component: ViewStudentsComponent, canActivate: [RoutesAuthenticationService], },
      { path: 'view/:id', component: ViewStudentComponent, canActivate: [RoutesAuthenticationService], }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

export const routedComponents = [
  RegisterStudentComponent
];