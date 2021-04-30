import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:8000/api/subjects';
  domain = 'http://localhost:8000';

  createSubject(subject) {
    return this.http.post<any>(`${this.rootUrl}`, subject);
  }

  getAllSubjectsByCourseMeidum(courseMediumId) {
    return this.http.get<any>(`${this.rootUrl}/course_medium/${courseMediumId}`)
  }

  getAllSubjectsByCourseMediumALL(courseMediumId) {
    return this.http.get<any>(`${this.rootUrl}/all/course_medium/${courseMediumId}`)
  }

  updateSubject(data, subjectId) {
    return this.http.put<any>(`${this.rootUrl}/${subjectId}`, data);
  }

  changeDeleteStatus(subjectId, status) {
    return this.http.get<any>(`${this.rootUrl}/status/${subjectId}/${status}`);
  }
}
