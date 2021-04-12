import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:8000/api/lectures';
  domain = 'http://localhost:8000';

  createLecture(lecture) {
    return this.http.post<any>(`${this.rootUrl}`, lecture);
  }

  getAllLecturesByCourseMedium(courseMediumId) {
    return this.http.get<any>(`http://localhost:8000/api/lectures/course_medium/${courseMediumId}`);
  }

  getAllLecByCourseMedium(courseMediumId) {
    return this.http.get<any>(`http://localhost:8000/api/lectures/course_medium/${courseMediumId}/all`);
  }

  getAllLecturesBySubject(subjectId) {
    return this.http.get<any>(`http://localhost:8000/api/lectures/subjects/${subjectId}`);
  }

  getLectureById(lectureId) {
    return this.http.get<any>(`http://localhost:8000/api/lectures/${lectureId}`);
  }

  getAllLecturesByTeacher(teacherId) {
    return this.http.get<any>(`http://localhost:8000/api/teacher/lectures/${teacherId}`);
  }

  getAllLectureByStudent(studentId) {
    return this.http.get<any>(`http://localhost:8000/api/student/lectures/${studentId}`);
  }

  updateLecture(lectureId, data) {
    return this.http.put<any>(`http://localhost:8000/api/lectures/${lectureId}`, data);
  }

  createLesson(data) {
    return this.http.post<any>(`http://localhost:8000/api/lessons`, data);
  }

  getLessonsByLecture(lectureId) {
    return this.http.get<any>(`http://localhost:8000/api/lessons/lecture/${lectureId}`);
  }

  storeLessonMaterial(formData) {
    return this.http.post<any>(`http://localhost:8000/api/lessons_materials`, formData);
  }

  updateLessonMaterial(materialId, data) {
    return this.http.put<any>(`http://localhost:8000/api/lessons_materials/${materialId}`, data);
  }

  getMaterialsByLesson(lessonId) {
    return this.http.get<any>(`http://localhost:8000/api/lessons_materials/lesson/${lessonId}`);
  }

  downloadFile(data) {
    return this.http.post(`http://localhost:8000/api/lessons_materials/file`, data, { observe: 'response', responseType: 'arraybuffer' })
  }

  getAllLessonsWithMaterials(lecture_id) {
    return this.http.get<any>(`http://localhost:8000/api/lesson_materials/lesson/lecture/${lecture_id}`);
  }

  getLecturePayment(lecture_id) {
    return this.http.get<any>(`http://localhost:8000/api/lesson_materials/lesson/lecture/${lecture_id}`);
  }

  getLectureSchedule(lecture_id) {
    return this.http.get<any>(`http://localhost:8000/api/lesson_materials/lesson/lecture/${lecture_id}`);
  }

  getPaymentOfLecture(lectureId) {
    return this.http.get<any>(`http://localhost:8000/api/payment/lecture/${lectureId}`);
  }




}
