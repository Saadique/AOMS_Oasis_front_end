import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

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

  //============================Student Fee Reports================================//

  //all time
  getAllStudentFeeRecords() {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/all`, this.httpOptions);
  }

  getAllStudentFeeRecordsByMonth(year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/all/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllStudentFeeRecordsByDate(from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/all/from/${from_date}/to/${to_date}`, this.httpOptions);
  }



  //course
  getAllStudentFeeRecordsByCourse(courseId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/course/${courseId}`, this.httpOptions);
  }

  getAllStudentFeeRecordForCourseByMonth(courseId, year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/course/${courseId}/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllStudentFeeRecordForCourseByDate(courseId, from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/course/${courseId}/from/${from_date}/to/${to_date}`, this.httpOptions);
  }




  //teacher
  getAllStudentFeeRecordByTeacher(teacherId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/teacher/${teacherId}`, this.httpOptions);
  }

  getAllStudentFeeRecordForTeacherByMonth(teacherId, year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/teacher/${teacherId}/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllStudentFeeRecordForTeacherByDate(teacherId, from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/teacher/${teacherId}/from/${from_date}/to/${to_date}`, this.httpOptions);
  }




  //lecture
  getAllStudentFeeRecordByLecture(lectureId) {
    // this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/lecture/${lectureId}`);
  }

  getAllStudentFeeRecordForLectureByMonth(lectureId, year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/lecture/${lectureId}/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllStudentFeeRecordForLectureByDate(lectureId, from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/student_fee/lecture/${lectureId}/from/${from_date}/to/${to_date}`, this.httpOptions);
  }



  //============================Teacher Remuneration Reports================================//


  getAllRemunerationsPaidForTeachers() {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/all`)
  }

  getAllRemunerationsPaidForTeachersByTeacher(teacherId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/teacher/${teacherId}`, this.httpOptions)
  }

  getAllRemunerationsPaidForTeachersByLecture(lectureId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/lecture/${lectureId}`, this.httpOptions)
  }

  getAllRemunerationsPaidForTeachersByCourse(courseId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/teacher_remun/course/${courseId}`, this.httpOptions)
  }


  //============================Teacher Institute Share Reports================================//


  //all time
  getAllShareRecords() {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/all`, this.httpOptions);
  }

  getAllShareRecordsByMonth(year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/all/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllShareRecordsByDate(from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/all/from/${from_date}/to/${to_date}`, this.httpOptions);
  }



  //course
  getAllShareRecordsByCourse(courseId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/course/${courseId}`, this.httpOptions);
  }

  getAllShareRecordsForCourseByMonth(courseId, year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/course/${courseId}/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllShareRecordsForCourseByDate(courseId, from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/course/${courseId}/from/${from_date}/to/${to_date}`, this.httpOptions);
  }




  //teacher
  getAllShareRecordsByTeacher(teacherId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/teacher/${teacherId}`, this.httpOptions);
  }

  getAllShareRecordsForTeacherByMonth(teacherId, year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/teacher/${teacherId}/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllShareRecordsForTeacherByDate(teacherId, from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/teacher/${teacherId}/from/${from_date}/to/${to_date}`, this.httpOptions);
  }




  //lecture
  getAllShareRecordsByLecture(lectureId) {
    // this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/lecture/${lectureId}`);
  }

  getAllShareRecordsForLectureByMonth(lectureId, year, month) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/lecture/${lectureId}/year/${year}/month/${month}`, this.httpOptions);
  }

  getAllShareRecordsForLectureByDate(lectureId, from_date, to_date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/reports/share/lecture/${lectureId}/from/${from_date}/to/${to_date}`, this.httpOptions);
  }

}
