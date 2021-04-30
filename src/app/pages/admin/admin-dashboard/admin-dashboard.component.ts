import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import * as CanvasJS from 'assets/js/canvasjs.min';

@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  studentOpLink;
  userMgtLink;
  countData;

  studentLectureCount


  teacherOpLink;
  roomOpLink;
  addNewLec;
  dailyScheduleOpLink;
  createStudentLink;
  reportsLink;


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
    this.createStudentLink = "/pages/student/register";
    this.dailyScheduleOpLink = "/pages/course/schedule/view";
    this.reportsLink = "/pages/reports/fee";
  }

  getDashboardData() {
    this.userService.getAdminDashboardData().subscribe({
      next: (response) => {
        this.countData = response.counts;
        this.studentLectureCount = response.student_lecture_count;
        console.log(this.studentLectureCount);
        this.generateCharts();
      },
      error: (err) => {

      }
    })
  }

  generateCharts() {
    let chartData = [];
    for (let i = 0; i < this.studentLectureCount.length; i++) {
      const element = this.studentLectureCount[i];
      let obj = {
        y: element.student_count,
        label: element.lecture_name
      }
      chartData.push(obj);
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Student Numbers"
      },
      data: [{
        type: "column",
        dataPoints: chartData
      }]
    });
    chart.render();
  }




}
