import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:8000/api/lectures';
  domain = 'http://localhost:8000';

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

  getAllLectures() {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lectures`, this.httpOptions);
  }

  createLecture(lecture) {
    this.initHttpOptions();
    return this.http.post<any>(`${this.rootUrl}`, lecture, this.httpOptions);
  }


  getAllLecturesByCourseMedium(courseMediumId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lectures/course_medium/${courseMediumId}`, this.httpOptions);
  }

  getAllLecByCourseMedium(courseMediumId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lectures/course_medium/${courseMediumId}/all`, this.httpOptions);
  }

  getAllLecturesBySubject(subjectId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lectures/subjects/${subjectId}`, this.httpOptions);
  }

  getLectureById(lectureId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lectures/${lectureId}`, this.httpOptions);
  }

  getAllLecturesByTeacher(teacherId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/teacher/lectures/${teacherId}`, this.httpOptions);
  }

  getAllLectureByStudent(studentId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/student/lectures/${studentId}`, this.httpOptions);
  }



  updateLecture(lectureId, data) {
    this.initHttpOptions();
    return this.http.put<any>(`http://localhost:8000/api/lectures/${lectureId}`, data, this.httpOptions);
  }

  updateLecturePayment(paymentId, data) {
    this.initHttpOptions();
    return this.http.put<any>(`http://localhost:8000/api/payments/${paymentId}`, data, this.httpOptions);
  }

  changeLectureDeleteStatus(lectureId, status) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lectures/status/${lectureId}/${status}`, this.httpOptions);
  }

  createLesson(data) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/lessons`, data, this.httpOptions);
  }

  updateLesson(lessonId, data) {
    this.initHttpOptions();
    return this.http.put<any>(`http://localhost:8000/api/lessons/${lessonId}`, data, this.httpOptions);
  }

  changeLessonDeleteStatus(lessonId, status) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lessons/status/${lessonId}/${status}`, this.httpOptions);
  }

  getLessonsByLecture(lectureId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lessons/lecture/${lectureId}`, this.httpOptions);
  }

  storeLessonMaterial(formData) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token-oasis')
      })
    };

    return this.http.post<any>(`http://localhost:8000/api/lessons_materials`, formData, this.httpOptions);
  }

  updateLessonMaterial(materialId, data) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/lesson_materials/material/${materialId}`, data, this.httpOptions);
  }

  updateLessonMaterialInfo(materialId, data) {
    this.initHttpOptions();
    return this.http.put<any>(`http://localhost:8000/api/lesson_materials/info/${materialId}`, data, this.httpOptions);
  }

  deleteMaterial(materialId) {
    this.initHttpOptions();
    return this.http.delete<any>(`http://localhost:8000/api/lessons_materials/${materialId}`, this.httpOptions);
  }

  getMaterialsByLesson(lessonId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lessons_materials/lesson/${lessonId}`, this.httpOptions);
  }

  downloadFile(data) {
    this.initHttpOptions();
    return this.http.post(`http://localhost:8000/api/lessons_materials/file`, data,
      {
        observe: 'response',
        responseType: 'arraybuffer'
      })
  }

  getAllLessonsWithMaterials(lecture_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lesson_materials/lesson/lecture/${lecture_id}`, this.httpOptions);
  }

  getLecturePayment(lecture_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lesson_materials/lesson/lecture/${lecture_id}`, this.httpOptions);
  }

  getLectureSchedule(lecture_id) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/lesson_materials/lesson/lecture/${lecture_id}`, this.httpOptions);
  }

  getPaymentOfLecture(lectureId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/payment/lecture/${lectureId}`, this.httpOptions);
  }




}
