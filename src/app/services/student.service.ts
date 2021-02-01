import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  createStudent(student) {
    return this.http.post<any>(`http://localhost:8000/api/students`, student);
  }

  getAllStudents() {
    return this.http.get<any>(`http://localhost:8000/api/students`);
  }

  getStudentById(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/students/${studentId}`)
  }

}
