import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  createRoom(data) {
    return this.http.post<any>(`http://localhost:8000/api/rooms`, data);
  }

  getAllRooms() {
    return this.http.get<any>(`http://localhost:8000/api/rooms`);
  }

  updateRoom(data, roomId) {
    return this.http.put<any>(`http://localhost:8000/api/rooms/${roomId}`, data);
  }
}
