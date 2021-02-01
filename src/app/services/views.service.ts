import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:8000/api/courses';
  domain = 'http://localhost:8000';

  getAllViews() {
    return this.http.get<any>(`${this.domain}/api/views/children/all`)
  }
}
