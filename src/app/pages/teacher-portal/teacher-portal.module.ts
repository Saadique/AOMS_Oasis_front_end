import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAlertModule,
  NbAccordionModule,
  NbStepperModule,
  NbMenuModule,
  NbTabsetModule,
  NbDialogModule,
  NbLayoutModule,
  NbListModule
} from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TeacherPortalRoutingModule } from './teacher-portal-routing.module';
import { TeacherPortalComponent } from './teacher-portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { MyClassComponent } from './my-class/my-class.component';
import { MyRenumerationsComponent } from './my-renumerations/my-renumerations.component';
import { MyTimetableComponent } from './my-timetable/my-timetable.component';
import { TotalIncomeComponent } from './total-income/total-income.component';
import { MyStudentAttendancesComponent } from './my-student-attendances/my-student-attendances.component';

@NgModule({
  declarations: [TeacherPortalComponent, TeacherDashboardComponent, MyClassesComponent, MyClassComponent, MyRenumerationsComponent, MyTimetableComponent, TotalIncomeComponent, MyStudentAttendancesComponent],
  imports: [
    CommonModule,
    TeacherPortalRoutingModule,
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
    NbLayoutModule,
    NbDialogModule,
    Ng2SmartTableModule,
    NbListModule
  ]
})
export class TeacherPortalModule { }
