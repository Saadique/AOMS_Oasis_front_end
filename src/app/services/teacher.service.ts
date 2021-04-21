import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeacherById(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/teachers/${teacherId}`);
  }

  getAllTeachers() {
    return this.http.get<any>(`http://localhost:8000/api/teachers`);
  }

  getAllActiveTeachers() {
    return this.http.get<any>(`http://localhost:8000/api/teachers/all/teachers`);
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

  getTotalMonthlyIncomeForLecture(lectureId, teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/income/total/lecture/${lectureId}/${teacherId}`);
  }

  getTotalMonthlyIncome(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/income/total/${teacherId}`);
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

  updateTeacher(data, teacherId) {
    return this.http.put<any>(`http://localhost:8000/api/teachers/${teacherId}`, data);
  }


}
