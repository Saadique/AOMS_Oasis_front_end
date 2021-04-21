import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';

@Component({
  selector: 'ngx-total-income',
  templateUrl: './total-income.component.html',
  styleUrls: ['./total-income.component.scss']
})
export class TotalIncomeComponent implements OnInit {

  teacher;
  totalMonthlyIncomeForLectures = [];
  totalMonthlyIncome = [];
  lecturesOfTeacher;

  constructor(private teacherService: TeacherService,
    private localStorageService: LocalStorageService) { }

  loggedInUser;
  role;

  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
    this.teacher = this.loggedInUser.teacher;
  }

  ngOnInit(): void {
    this.getUserRoleId()
    this.getLecturesOfTeacher();
    this.getTotalMonthlyIncomeForTeacher();
  }

  getLecturesOfTeacher() {
    this.teacherService.getLecturesOfTeacher(this.teacher.id).subscribe(
      {
        next: (response) => {
          this.lecturesOfTeacher = response;
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  getTotalMonthlyIncomeForLecture($lectureId) {
    this.teacherService.getTotalMonthlyIncomeForLecture($lectureId, this.teacher.id).subscribe(
      {
        next: (response) => {
          this.totalMonthlyIncomeForLectures = response;
          this.calculateTotalMonthlyIncomeForLecture();
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  totalAmountReceivedForLecture;
  calculateTotalMonthlyIncomeForLecture() {
    let totalAmount = 0;
    for (let i = 0; i < this.totalMonthlyIncomeForLectures.length; i++) {
      let income = this.totalMonthlyIncomeForLectures[i];
      totalAmount = totalAmount + income.total_amount;
    }
    this.totalAmountReceivedForLecture = totalAmount;
  }

  getTotalMonthlyIncomeForTeacher() {
    this.teacherService.getTotalMonthlyIncome(this.teacher.id).subscribe(
      {
        next: (response) => {
          this.totalMonthlyIncome = response;
          this.calculateTotalMonthlyIncome();
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  totalAmountReceived;
  calculateTotalMonthlyIncome() {
    let totalAmount = 0;
    for (let i = 0; i < this.totalMonthlyIncome.length; i++) {
      let income = this.totalMonthlyIncome[i];
      totalAmount = totalAmount + income.total_amount;
    }
    this.totalAmountReceived = totalAmount;
  }


}
