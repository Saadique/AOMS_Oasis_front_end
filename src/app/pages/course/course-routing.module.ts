import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';
import { ViewSchedulesComponent } from './view-schedules/view-schedules.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { RoutesAuthenticationService } from 'app/authentication/services/authentication/routes-authentication.service';
import { RoomManagementComponent } from './room-management/room-management.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { CreateMediumComponent } from './create-medium/create-medium.component';

const routes: Routes = [{
  path: '', component: CourseComponent,
  // children: [
  //   { path: 'create', component: CreateCourseComponent, canActivate: [RoutesAuthenticationService] },
  //   { path: 'subject/create', component: CreateSubjectComponent, canActivate: [RoutesAuthenticationService] },
  //   { path: 'lecture/create', component: CreateLectureComponent, canActivate: [RoutesAuthenticationService] },
  //   { path: 'schedule/view', component: ViewSchedulesComponent, canActivate: [RoutesAuthenticationService] },
  //   { path: 'view', component: ViewCoursesComponent, canActivate: [RoutesAuthenticationService] },
  //   { path: 'view/:id', component: ViewCourseComponent, canActivate: [RoutesAuthenticationService] },
  //   { path: 'rooms', component: RoomManagementComponent, canActivate: [RoutesAuthenticationService] },
  // ]

  children: [
    { path: 'create', component: CreateCourseComponent },
    { path: 'subject/create', component: CreateSubjectComponent },
    { path: 'lecture/create', component: CreateLectureComponent },
    { path: 'schedule/view', component: ViewSchedulesComponent },
    { path: 'view', component: ViewCoursesComponent },
    { path: 'view/:id', component: ViewCourseComponent },
    { path: 'rooms', component: RoomManagementComponent },
    { path: 'edit', component: EditCoursesComponent },
    { path: 'medium/create', component: CreateMediumComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }

export const routedComponents = [
  CreateCourseComponent
];