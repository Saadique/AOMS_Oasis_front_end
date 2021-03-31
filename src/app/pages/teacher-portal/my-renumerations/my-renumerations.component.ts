import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { Alert } from 'app/pages/course/create-course/create-course.component';

@Component({
  selector: 'ngx-my-renumerations',
  templateUrl: './my-renumerations.component.html',
  styleUrls: ['./my-renumerations.component.scss']
})


export class MyRenumerationsComponent implements OnInit {
  userData;
  teacher;
  lecturesOfTeacher;
  lecYears;
  lecMonths = [];
  selectedLecture;
  selectedYear;
  selectedMonth;
  allMonthlyRemunerations;
  paidMonthlyRemunerations;


  alertRemun = new Alert();
  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    let data: any = window.localStorage.getItem('user-data');
    this.userData = JSON.parse(data);
    this.teacher = this.userData.teacher;
    this.getLecturesOfTeacher(this.teacher.id);
  }

  getLecturesOfTeacher(teacherId) {
    this.teacherService.getLecturesOfTeacher(teacherId).subscribe(
      {
        next: (response) => {
          // console.log(response);
          this.lecturesOfTeacher = response;
          console.log(this.lecturesOfTeacher);
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  selectRemunerationLec(lectureId) {
    this.teacherService.getLecMonths(lectureId).subscribe(
      {
        next: (response) => {
          // console.log(response);
          this.lecYears = response;
          this.selectedLecture = lectureId;
          this.selectedYear = null;
          this.selectedMonth = null;
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  selectYear(year) {
    let monthNumbers = this.lecYears[year];
    this.lecMonths = [];
    this.selectedMonth = null;
    for (let i = 0; i < monthNumbers.length; i++) {
      this.lecMonths.push(this.monthNames[parseInt(monthNumbers[i]) - 1]);
    }
    this.selectedYear = year;
  }

  selectMonth(month) {
    this.selectedMonth = month;
  }

  seeMyRemuns() {
    if (this.selectedLecture != null && this.selectedYear != null && this.selectedMonth != null) {
      this.teacherService.getAllMonthlyRemunerations(this.selectedLecture, this.selectedYear, this.selectedMonth).subscribe(
        {
          next: (response) => {
            this.allMonthlyRemunerations = response;
            console.log(this.allMonthlyRemunerations);
          },
          error: (err) => {
            console.log(err)
          }
        }
      )

      this.teacherService.getPaidMonthlyRemunerations(this.teacher.id, this.selectedLecture, this.selectedYear, this.selectedMonth).subscribe(
        {
          next: (response) => {
            this.paidMonthlyRemunerations = response;
            console.log(this.paidMonthlyRemunerations);
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
    } else {
      this.setAlert('Error', 'Please select all required parameters');
    }
  }



  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.alertRemun.status = alertStatus;
    this.alertRemun.message = alertMessage;
    setTimeout(() => { this.alertRemun = { "status": null, "message": null } }, 4500); // fade alert
  }

}
