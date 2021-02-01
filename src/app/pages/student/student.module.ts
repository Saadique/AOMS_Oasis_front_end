import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAlertModule,
  NbAccordionModule,
  NbStepperModule,
  NbMenuModule,
  NbTabsetModule,
  NbLayoutModule,
  NbListModule
} from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { StudentRoutingModule, routedComponents } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ThemeModule } from '../../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { CreatePaymentSchemeComponent } from './create-payment-scheme/create-payment-scheme.component';

@NgModule({
  declarations: [...routedComponents, StudentComponent, RegisterStudentComponent, ViewStudentsComponent, ViewStudentComponent, CreatePaymentSchemeComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ThemeModule,
    NbAlertModule,
    RouterModule,
    NbAccordionModule,
    NbStepperModule,
    NbMenuModule,
    NbTabsetModule,
    NbListModule,
    Ng2SmartTableModule

  ]
})
export class StudentModule { }


