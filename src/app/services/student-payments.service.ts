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

  getMonthlyPayments(studentPaymentId) {
    return this.http.get<any>(`http://localhost:8000/api/monthly-payment/student-payment/${studentPaymentId}`);
  }

}
