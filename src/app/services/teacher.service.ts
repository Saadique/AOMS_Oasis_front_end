import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getAllTeachers() {
    return this.http.get<any>(`http://localhost:8000/api/teachers`);
  }

  createTeacher(data) {
    return this.http.post<any>(`http://localhost:8000/api/teachers`, data);
  }

  getLecturesOfTeacher(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/lectures/${teacherId}`);
  }

  getLecMonths(lectureId) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/lecture/months/${lectureId}`);
  }


}
