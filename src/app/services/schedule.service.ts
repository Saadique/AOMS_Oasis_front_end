import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  rootUrl = 'http://localhost:8000/api/schedules';
  domain = 'http://localhost:8000';

  createSchedule($schedule) {
    return this.http.post<any>(`${this.rootUrl}`, $schedule);
  }

  getAllMatchingSchedules($matchedSchedule) {
    return this.http.post<any>('http://localhost:8000/api/schedules/matching', $matchedSchedule);
  }

  getSchedulesByDate(date) {
    return this.http.get<any>(`http://localhost:8000/api/daily-schedules/date/${date}`);
  }

  getStudentSchedules(date, studentId) {
    return this.http.get<any>(`http://localhost:8000/api/daily-schedules/date/student/${date}/${studentId}`);
  }

  createOneTimeSchedule($dailySchedule) {
    return this.http.post<any>(`http://localhost:8000/api/daily-schedules`, $dailySchedule);
  }

  updateDailySchedule($data, $id: number) {
    return this.http.put<any>(`http://localhost:8000/api/daily-schedules/${$id}`, $data);
  }

  deleteDailySchedule(id) {
    return this.http.delete<any>(`http://localhost:8000/api/daily-schedules/${id}`);
  }

}
