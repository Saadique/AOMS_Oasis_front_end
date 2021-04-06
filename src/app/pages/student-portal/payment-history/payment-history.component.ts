import { Component, OnInit } from '@angular/core';
import { StudentPaymentsService } from 'app/services/student-payments.service';

@Component({
  selector: 'ngx-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  studentId;
  userData;
  studentLectures;
  activePayables;
  payedPayments;
  duePayments;
  constructor(private studentPaymentService: StudentPaymentsService) { }

  ngOnInit(): void {
    let data: any = window.localStorage.getItem('user-data');
    this.userData = JSON.parse(data);
    this.studentId = this.userData.student.id;
    this.getLecturesOfStudent();
  }

  getLecturesOfStudent() {
    this.studentPaymentService.getAllStudentPayments(this.studentId).subscribe(
      {
        next: (response) => {
          // console.log(response);
          this.studentLectures = response;
          console.log(this.studentLectures);
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  getActivePayables(studentPaymentId) {
    this.studentPaymentService.getMonthlyPayments(studentPaymentId).subscribe((response) => {
      console.log(response);
      this.activePayables = response;
    })
  }

  getPaymentHistory(studentPaymentId) {
    this.studentPaymentService.getMonthlyPaidPayments(studentPaymentId).subscribe((response) => {
      console.log(response);
      this.payedPayments = response;
    })
  }

  getDuePayments(studentPaymentId) {
    this.studentPaymentService.getMonthlyDuePayments(studentPaymentId).subscribe((response) => {
      console.log(response);
      this.duePayments = response;
    })
  }

  selectPayment($event) {
    this.getActivePayables($event);
    this.getPaymentHistory($event);
    this.getDuePayments($event);
  }
}
