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

  constructor(
    private localStorageService: LocalStorageService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeacher();
    this.getUptoDateNotifications();
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

}
