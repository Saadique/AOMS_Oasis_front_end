import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

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

  createRoom(data) {
    this.initHttpOptions();
    return this.http.post<any>(`http://localhost:8000/api/rooms`, data, this.httpOptions);
  }

  getAllRooms() {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/rooms`, this.httpOptions);
  }

  getAllActiveRooms() {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/rooms/all/rooms`, this.httpOptions);
  }

  updateRoom(data, roomId) {
    this.initHttpOptions();
    return this.http.put<any>(`http://localhost:8000/api/rooms/${roomId}`, data, this.httpOptions);
  }

  changeStatus(roomId, status) {
    this.initHttpOptions();
    return this.http.get<any>(`http://localhost:8000/api/rooms/status/${roomId}/${status}`, this.httpOptions);
  }
}
