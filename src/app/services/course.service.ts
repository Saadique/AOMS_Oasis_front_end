import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:8000/api/courses';
  domain = 'http://localhost:8000';

  getAllCourses() {
    return this.http.get<any>(`${this.domain}/api/courses`);
  }

  getAllCourseByType(courseType) {
    return this.http.get<any>(`${this.domain}/api/courses/type/${courseType}`);
  }

  getAllMediums() {
    return this.http.get<any>(`${this.domain}/api/mediums`)
  }

  createCourse(course) {
    return this.http.post<any>(`http://localhost:8000/api/courses`, course);
  }

  getOneCourse(courseId) {
    return this.http.get<any>(`${this.domain}/api/courses/${courseId}`);
  }

  getCoursesWithMediums(courseId) {
    return this.http.get<any>(`${this.domain}/api/course/course_mediums/${courseId}`);
  }
  // http://localhost:8000/api/course/medium/all

  getAllCoursesWithMediums() {
    return this.http.get<any>(`${this.domain}/api/course/medium/all`);
  }

  getAllCourseMediums() {
    return this.http.get<any>(`${this.domain}/api/course_mediums`);
  }

  getOneCourseMedium(courseMediumId) {
    return this.http.get(`http://localhost:8000/api/course_mediums/${courseMediumId}`);
  }

}
