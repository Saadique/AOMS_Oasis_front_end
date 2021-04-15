import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAllStudentFeeRecords() {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/all`);
  }

  getAllStudentFeeRecordsByCourse(courseId) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/course/${courseId}`);
  }
}
