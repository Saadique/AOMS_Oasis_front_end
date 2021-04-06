import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherPortalComponent } from './teacher-portal.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { MyClassComponent } from './my-class/my-class.component';
import { MyRenumerationsComponent } from './my-renumerations/my-renumerations.component';
import { MyTimetableComponent } from './my-timetable/my-timetable.component';
import { TotalIncomeComponent } from './total-income/total-income.component';
import { MyStudentAttendancesComponent } from './my-student-attendances/my-student-attendances.component';

const routes: Routes = [{
  path: '', component: TeacherPortalComponent,
  children: [
    { path: 'dashboard', component: TeacherDashboardComponent },
    { path: 'my_classes', component: MyClassesComponent },
    { path: 'my_class/:lecture_id', component: MyClassComponent },
    { path: 'my_remunerations', component: MyRenumerationsComponent },
    { path: 'my_timetable', component: MyTimetableComponent },
    { path: 'total_income', component: TotalIncomeComponent },
    { path: 'my_student_attendances', component: MyStudentAttendancesComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherPortalRoutingModule { }
