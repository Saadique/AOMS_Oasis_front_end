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


}
