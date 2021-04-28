import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeReportsComponent } from './fee-reports/fee-reports.component';
import { TeacherRemunerationReportsComponent } from './teacher-remuneration-reports/teacher-remuneration-reports.component';
import { TeacherInstituteShareReportsComponent } from './teacher-institute-share-reports/teacher-institute-share-reports.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fee', component: FeeReportsComponent },
      { path: 'teacher', component: TeacherRemunerationReportsComponent },
      { path: 'teacher_institute_share', component: TeacherInstituteShareReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportGenerationRoutingModule { }
