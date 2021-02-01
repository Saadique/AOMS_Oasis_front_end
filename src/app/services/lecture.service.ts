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

}
