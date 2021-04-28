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
  NbListModule,
} from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReportGenerationRoutingModule } from './report-generation-routing.module';
import { ReportGenerationComponent } from './report-generation.component';
import { ThemeModule } from '../../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeeReportsComponent } from './fee-reports/fee-reports.component';
import { TeacherRemunerationReportsComponent } from './teacher-remuneration-reports/teacher-remuneration-reports.component';
import { TeacherInstituteShareReportsComponent } from './teacher-institute-share-reports/teacher-institute-share-reports.component';

@NgModule({
  declarations: [ReportGenerationComponent, FeeReportsComponent, TeacherRemunerationReportsComponent, TeacherInstituteShareReportsComponent],
  imports: [
    CommonModule,
    ReportGenerationRoutingModule,
    CommonModule,
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
    Ng2SmartTableModule,
    // NbButtonGroupModule
  ]
})
export class ReportGenerationModule { }
