import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  markAttendance(data) {
    return this.http.post<any>(`http://localhost:8000/api/attendances`, data);
  }
}
