import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'ngx-my-timetable',
  templateUrl: './my-timetable.component.html',
  styleUrls: ['./my-timetable.component.scss']
})
export class MyTimetableComponent implements OnInit {

  teacher;
  teacherSchedules;

  constructor(
    private localStorageService: LocalStorageService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeacher();
    this.getTeacherTimetables();
  }

  getTeacher() {
    let userData = this.localStorageService.getData();
    this.teacher = userData.teacher;
    console.log(this.teacher);
  }

  getTeacherTimetables() {
    this.teacherService.getSchedulesOfTeacher(this.teacher.id).subscribe(
      (response) => {
        this.teacherSchedules = response;
        console.log(response);
      }
    )
  }




}
