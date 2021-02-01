import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPortalRoutingModule } from './student-portal-routing.module';
import { StudentPortalComponent } from './student-portal.component';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { MySchedulesComponent } from './my-schedules/my-schedules.component';
import { MyClassComponent } from './my-class/my-class.component';

@NgModule({
  declarations: [StudentPortalComponent, StudentDashboardComponent, MySchedulesComponent, MyClassComponent],
  imports: [
    CommonModule,
    StudentPortalRoutingModule,
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
export class StudentPortalModule { }
