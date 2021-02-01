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

import { ThemeModule } from '../../@theme/theme.module';
import { CourseRoutingModule, routedComponents } from './course-routing.module';
import { CourseComponent } from './course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';
import { ViewSchedulesComponent } from './view-schedules/view-schedules.component';
import { RouterModule } from '@angular/router';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { RoomManagementComponent } from './room-management/room-management.component';

@NgModule({
  declarations: [...routedComponents, CourseComponent, CreateSubjectComponent, CreateLectureComponent, ViewSchedulesComponent, ViewCoursesComponent, ViewCourseComponent, RoomManagementComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
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
    NbDialogModule
  ]
})
export class CourseModule { }
