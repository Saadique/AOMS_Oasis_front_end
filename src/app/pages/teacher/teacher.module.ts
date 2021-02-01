import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';

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
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';


@NgModule({
  declarations: [TeacherComponent, ViewTeachersComponent, ViewTeacherComponent, CreateTeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
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
export class TeacherModule { }
