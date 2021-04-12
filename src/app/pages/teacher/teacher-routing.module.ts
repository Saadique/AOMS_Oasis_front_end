import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';

const routes: Routes = [
  {
    path: '', component: TeacherComponent,
    children: [
      { path: 'view', component: ViewTeachersComponent },
      { path: 'view/:teacherId', component: ViewTeacherComponent },
      { path: 'create', component: CreateTeacherComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
