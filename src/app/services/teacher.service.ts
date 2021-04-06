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

  getAllMonthlyRemunerations(lectureId, year, month) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/lecture/month/remuneration/${lectureId}/${year}/${month}/all`);
  }

  getPaidMonthlyRemunerations(teacherId, lectureId, year, month) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/lecture/month/remuneration/${teacherId}/${lectureId}/${year}/${month}/paid`);
  }

  getSchedulesOfTeacher(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/timetables/${teacherId}`);
  }

  getTeacherUptoDateNotifications(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/schedules/notifications/teacher/${teacherId}`);
  }

  getStudentAttendancesByLecture(lectureId, date) {
    return this.http.get<any>(`http://localhost:8000/api/attendances/lecture/date/${lectureId}/${date}`);
  }


}
