import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'ngx-admin-staff-dashboard',
  templateUrl: './admin-staff-dashboard.component.html',
  styleUrls: ['./admin-staff-dashboard.component.scss']
})
export class AdminStaffDashboardComponent implements OnInit {

  studentOpLink;
  userMgtLink;
  countData;
  teacherOpLink;
  roomOpLink;
  addNewLec;
  dailyScheduleOpLink;
  createStudentLink;


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getDashboardData();
    this.studentOpLink = "/pages/student/view";
    this.createStudentLink = "/pages/student/register";
    this.addNewLec = "/pages/course/lecture/create";
    this.userMgtLink = "/pages/user-management/accounts";
    this.teacherOpLink = "/pages/teachers/view";
    this.roomOpLink = "/pages/course/rooms";
    this.dailyScheduleOpLink = "/pages/course/schedule/view";
  }

  getDashboardData() {
    this.userService.getAdminDashboardData().subscribe({
      next: (response) => {
        this.countData = response.counts;
      },
      error: (err) => {

      }
    })
  }

}
