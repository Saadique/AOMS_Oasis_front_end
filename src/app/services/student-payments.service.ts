import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentPaymentsService {

  constructor(private http: HttpClient) { }

  storeStudentPayments(data) {
    return this.http.post<any>(`http://localhost:8000/api/student-payments`, data);
  }

  getStudentPayments(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/student-payment/student/${studentId}`);
  }

  getAllStudentPayments(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/student-payment-all/student/${studentId}`);
  }

  getMonthlyPayments(studentPaymentId) {
    return this.http.get<any>(`http://localhost:8000/api/monthly-payment/student-payment/payable/${studentPaymentId}`);
  }

  getMonthlyPaidPayments(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/monthly-payment/student-payment/paid/${studentId}`);
  }

  getMonthlyDuePayments(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/monthly-payment/student-payment/due/${studentId}`);
  }

  payFee(monthlyPaymentId, data) {
    return this.http.put<any>(`http://localhost:8000/api/monthly-payments/${monthlyPaymentId}`, data);
  }

  changeDueStatus() {
    return this.http.get<any>(`http://localhost:8000/api/monthly-payment/student-payment/check_due`);
  }

}
