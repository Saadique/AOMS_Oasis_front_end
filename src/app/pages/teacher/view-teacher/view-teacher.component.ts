import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'app/pages/course/create-course/create-course.component';
import { TeacherService } from '../../../services/teacher.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  teacherId;
  teacher;
  teacherEditForm: FormGroup;
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
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  alertRemun = new Alert();

  ngOnInit(): void {
    console.log("lol");
    this.route.params.subscribe(routeParams => {
      this.teacherId = routeParams.teacherId;
      this.getTeacherById();
      this.getLecturesOfTeacher();
      this.getTotalMonthlyIncomeForTeacher();
      this.initRemunForm();
    });
  }

  initTeacherEditForm() {
    this.teacherEditForm = this.fb.group({
      name: [this.teacher.name, Validators.required],
      email: [this.teacher.email, Validators.required],
      mobile_no: [this.teacher.mobile_no, Validators.required],
      nic: [this.teacher.nic, Validators.required],
      address: [this.teacher.address, null]
    });
  }

  getTeacherById() {
    this.teacherService.getTeacherById(this.teacherId).subscribe({
      next: (response) => {
        this.teacher = response;
        this.initTeacherEditForm();
        console.log(this.teacherEditForm);
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

  submitEdit() {
    if (this.teacher.name != '' && this.teacher.mobile_no != '' && this.teacher.email) {
      this.teacherService.updateTeacher(this.teacher, this.teacher.id).subscribe(
        {
          next: (response) => {
            this.getTeacherById();
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
    }
  }

  selectRemunTimeForm: FormGroup;
  initRemunForm() {
    this.selectRemunTimeForm = this.fb.group({
      lecture: ['', null],
      year: ['', null],
      month: ['', null]
    })
  }

  selectRemunerationLec(lectureId) {
    this.selectRemunTimeForm.controls['year'].setValue('');
    this.selectRemunTimeForm.controls['month'].setValue('');
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
    this.selectRemunTimeForm.controls['month'].setValue('');
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
            this.calculateTotal();
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

  totalAmountReceivedForMonth;
  calculateTotal() {
    let totalAmount = 0;
    for (let i = 0; i < this.paidMonthlyRemunerations.length; i++) {
      let feeRecord = this.paidMonthlyRemunerations[i];
      totalAmount = totalAmount + feeRecord.teacher_amount;
    }
    this.totalAmountReceivedForMonth = totalAmount;
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
