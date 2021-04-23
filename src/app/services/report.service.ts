import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }


  //============================Student Fee Reports================================//

  //all time
  getAllStudentFeeRecords() {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/all`);
  }

  getAllStudentFeeRecordsByMonth(year, month) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/all/year/${year}/month/${month}`);
  }

  getAllStudentFeeRecordsByDate(from_date, to_date) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/all/from/${from_date}/to/${to_date}`);
  }



  //course
  getAllStudentFeeRecordsByCourse(courseId) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/course/${courseId}`);
  }

  getAllStudentFeeRecordForCourseByMonth(courseId, year, month) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/course/${courseId}/year/${year}/month/${month}`);
  }

  getAllStudentFeeRecordForCourseByDate(courseId, from_date, to_date) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/course/${courseId}/from/${from_date}/to/${to_date}`);
  }




  //teacher
  getAllStudentFeeRecordByTeacher(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/teacher/${teacherId}`);
  }

  getAllStudentFeeRecordForTeacherByMonth(teacherId, year, month) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/teacher/${teacherId}/year/${year}/month/${month}`);
  }

  getAllStudentFeeRecordForTeacherByDate(teacherId, from_date, to_date) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/teacher/${teacherId}/from/${from_date}/to/${to_date}`);
  }




  //lecture
  getAllStudentFeeRecordByLecture(lectureId) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/lecture/${lectureId}`);
  }

  getAllStudentFeeRecordForLectureByMonth(lectureId, year, month) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/lecture/${lectureId}/year/${year}/month/${month}`);
  }

  getAllStudentFeeRecordForLectureByDate(lectureId, from_date, to_date) {
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/lecture/${lectureId}/from/${from_date}/to/${to_date}`);
  }



  //============================Teacher Remuneration Reports================================//


  getAllRemunerationsPaidForTeachers() {
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/all`)
  }

  getAllRemunerationsPaidForTeachersByTeacher(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/teacher/${teacherId}`)
  }

  getAllRemunerationsPaidForTeachersByLecture(lectureId) {
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/lecture/${lectureId}`)
  }

  getAllRemunerationsPaidForTeachersByCourse(courseId) {
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/course/${courseId}`)
  }


}
