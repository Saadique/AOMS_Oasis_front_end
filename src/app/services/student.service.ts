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

}
