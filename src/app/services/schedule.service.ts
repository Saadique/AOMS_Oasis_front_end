import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:8000/api/schedules';
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

  createSchedule($schedule) {
    this.initHttpOptions();
    return this.http.post<any>(`${this.rootUrl}`, $schedule, this.httpOptions);
  }

  getAllMatchingSchedules($matchedSchedule) {
    this.initHttpOptions();
    return this.http.post<any>('http://localhost:8000/api/schedules/matching', $matchedSchedule, this.httpOptions);
  }

  getSchedulesByDate(date) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/daily-schedules/date/${date}`, this.httpOptions);
  }

  getStudentSchedules(date, studentId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/daily-schedules/date/student/${date}/${studentId}`, this.httpOptions);
  }

  createOneTimeSchedule($dailySchedule) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/daily-schedules`, $dailySchedule, this.httpOptions);
  }

  updateDailySchedule($data, $id: number) {
    this.initHttpOptions();
    return this.http.put<any>(`http://localhost:8000/api/daily-schedules/${$id}`, $data, this.httpOptions);
  }

  deleteDailySchedule(id) {
    this.initHttpOptions();
    return this.http.delete<any>(`http://localhost:8000/api/daily-schedules/${id}`, this.httpOptions);
  }

  getSchedulesByLecture(lectureId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/schedules/lecture/${lectureId}`, this.httpOptions);
  }

  getScheduleByDateAndLecture(date, lectureId, studentId) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/daily-schedules/date/lecture/${date}/${lectureId}/${studentId}`, this.httpOptions);
  }
}
