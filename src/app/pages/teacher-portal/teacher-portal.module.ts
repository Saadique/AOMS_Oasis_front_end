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
  NbLayoutModule
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

@NgModule({
  declarations: [TeacherPortalComponent, TeacherDashboardComponent, MyClassesComponent, MyClassComponent],
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
    Ng2SmartTableModule
  ]
})
export class TeacherPortalModule { }
