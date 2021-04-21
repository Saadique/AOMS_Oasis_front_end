import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  studentOpLink;
  userMgtLink;
  countData;
  teacherOpLink;
  roomOpLink;
  addNewLec;
  dailyScheduleOpLink;


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getDashboardData();
    this.studentOpLink = "/pages/student/view";
    this.addNewLec = "/pages/course/lecture/create";
    this.userMgtLink = "/pages/user-management/accounts";
    this.teacherOpLink = "/pages/teachers/view";
    this.roomOpLink = "/pages/course/rooms";
    this.dailyScheduleOpLink = "/pages/course/schedule/view";
  }

  getDashboardData() {
    this.userService.getAdminDashboardData().subscribe({
      next: (response) => {
        this.countData = response;
      },
      error: (err) => {

      }
    })
  }




}
