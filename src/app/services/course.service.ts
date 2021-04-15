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
    return this.http.post<any>(`${this.domain}/api/mediums`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateMedium(data, mediumId) {
    return this.http.put<any>(`${this.domain}/api/mediums/${mediumId}`, data);
  }

  getMediums() {
    return this.http.get<any>(`${this.domain}/api/mediums/all/mediums`);
  }

  getCourses() {
    return this.http.get<any>(`${this.domain}/api/courses/all/courses`);
  }

  deleteMedium(mediumId) {
    return this.http.delete<any>(`${this.domain}/api/mediums/${mediumId}`);
  }

  activateMedium(mediumId) {
    return this.http.get<any>(`${this.domain}/api/mediums/status/activate/${mediumId}`);
  }

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
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/courses`, course, this.httpOptions);
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
