import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'app/pages/course/create-course/create-course.component';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'ngx-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  teacherId;
  teacher;
  lecturesOfTeacher;
  lecYears;
  lecMonths = [];
  selectedLecture;
  selectedYear;
  selectedMonth;
  allMonthlyRemunerations;
  paidMonthlyRemunerations;


  totalMonthlyIncomeForLectures: [] = [];
  totalMonthlyIncome: [] = [];

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,) { }

  alertRemun = new Alert();

  ngOnInit(): void {
    console.log("lol");
    this.route.params.subscribe(routeParams => {
      this.teacherId = routeParams.teacherId;
      this.getTeacherById();
      this.getLecturesOfTeacher();
      this.getTotalMonthlyIncomeForTeacher();
    });
  }

  getTeacherById() {
    this.teacherService.getTeacherById(this.teacherId).subscribe({
      next: (response) => {
        this.teacher = response;
      },
      error: (error) => {

      }
    })
  }

  getLecturesOfTeacher() {
    this.teacherService.getLecturesOfTeacher(this.teacherId).subscribe(
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

  getTotalMonthlyIncomeForLecture($lectureId) {
    this.teacherService.getTotalMonthlyIncomeForLecture($lectureId, this.teacherId).subscribe(
      {
        next: (response) => {
          this.totalMonthlyIncomeForLectures = response;
          console.log(this.totalMonthlyIncomeForLectures);
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  getTotalMonthlyIncomeForTeacher() {
    this.teacherService.getTotalMonthlyIncome(this.teacherId).subscribe(
      {
        next: (response) => {
          this.totalMonthlyIncome = response;
          console.log(this.totalMonthlyIncome);
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }


}
