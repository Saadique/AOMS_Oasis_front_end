import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  httpOptions;
  initHttpOptions() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token-oasis')
      })
    };
  }

  createStudent(student) {
    return this.http.post<any>(`http://localhost:8000/api/students`, student);
  }

  getAllStudents() {
    return this.http.get<any>(`http://localhost:8000/api/students`);
  }

  getStudentById(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/students/${studentId}`)
  }

  addLecture(data) {
    return this.http.post<any>(`http://localhost:8000/api/students/lecture/add`, data)
  }

  removeLecture(data) {
    return this.http.post<any>(`http://localhost:8000/api/students/lecture/remove`, data)
  }

  getStudentUptoDateNotifications(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/schedules/notifications/student/${studentId}`);
  }

  updateStudent(data, studentId) {
    return this.http.put<any>(`http://localhost:8000/api/students/${studentId}`, data);
  }

  getAllLecturesOfStudent(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/student/lectures/${studentId}`);
  }

  getAllStudentsByLecture(lectureId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lecture/${lectureId}/students`, this.httpOptions);
  }

  getAllStudentsByLevel(level) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/students/level/${level}`, this.httpOptions);
  }

  deactivateStudent(studentId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/students/${studentId}/deactivate`, this.httpOptions);
  }

}
