import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/authentication/services/local-storage/local-storage.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'ngx-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  teacher;
  notifications = [];

  attendanceLink;
  timeTableLink;
  monthlyRemunLink;
  totalIncome;

  constructor(
    private localStorageService: LocalStorageService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeacher();
    this.getUptoDateNotifications();
    this.attendanceLink = "/pages/teacher-portal/my_student_attendances";
    this.timeTableLink = "/pages/teacher-portal/my_timetable";
    this.totalIncome = "/pages/teacher-portal/total_income";
    this.monthlyRemunLink = "/pages/teacher-portal/my_remunerations";
  }

  getTeacher() {
    let userData = this.localStorageService.getData();
    this.teacher = userData.teacher;
    console.log(this.teacher);
  }

  getUptoDateNotifications() {
    this.teacherService.getTeacherUptoDateNotifications(this.teacher.id).subscribe({
      next: (response) => {
        this.notifications = response;
        console.log(this.notifications);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  decideClass() {
    if (this.getUptoDateNotifications.length != 0) {
      return "col-sm-8";
    }
    return "col-sm-12";
  }

}
