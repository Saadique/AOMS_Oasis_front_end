import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../authentication/services/local-storage/local-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {



  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  rootUrl = 'http://localhost:8000/api/courses';
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

  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      // window.location.replace("./authentication/login")
    }
    return throwError(error);
  }

  createMedium(data) {
    this.initHttpOptions();
    return this.http.post<any>(`${this.domain}/api/mediums`, data, this.httpOptions);
  }

  updateMedium(data, mediumId) {
    this.initHttpOptions();
    return this.http.put<any>(`${this.domain}/api/mediums/${mediumId}`, data, this.httpOptions);
  }

  getMediums() {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/mediums/all/mediums`, this.httpOptions);
  }

  getCourses() {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/courses/all/courses`);
  }

  deleteMedium(mediumId) {
    this.initHttpOptions();
    return this.http.delete<any>(`${this.domain}/api/mediums/${mediumId}`, this.httpOptions);
  }

  activateMedium(mediumId) {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/mediums/status/activate/${mediumId}`, this.httpOptions);
  }

  getAllCourses() {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/courses`);
  }

  getAllCourseByType(courseType) {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/courses/type/${courseType}`);
  }

  getAllMediums() {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/mediums`, this.httpOptions)
  }

  createCourse(course) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/courses`, course, this.httpOptions);
  }

  updateCourse(courseId, data) {
    this.initHttpOptions();
    return this.http.put<any>(`http://localhost:8000/api/courses/${courseId}`, data, this.httpOptions);
  }

  changeDeleteStatusCourse(courseId, status) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/courses/status/${status}/${courseId}`, this.httpOptions);
  }

  changeDeleteStatusCourseMedium(courseId, status) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/course_mediums/status/${status}/${courseId}`, this.httpOptions);
  }

  getOneCourse(courseId) {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/courses/${courseId}`);
  }

  getCoursesWithMediums(courseId) {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/course/course_mediums/${courseId}`);
  }
  // http://localhost:8000/api/course/medium/all

  getAllCoursesWithMediums() {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/course/medium/all`);
  }

  getAllCourseMediums() {
    this.initHttpOptions();
    return this.http.get<any>(`${this.domain}/api/course_mediums`);
  }

  getOneCourseMedium(courseMediumId) {
    this.initHttpOptions();
    return this.http.get(`http://localhost:8000/api/course_mediums/${courseMediumId}`);
  }

}
