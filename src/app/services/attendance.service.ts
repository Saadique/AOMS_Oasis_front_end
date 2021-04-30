import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

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

  markAttendance(data) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/attendances`, data, this.httpOptions);
  }
}
