import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createAdmin(data) {
    return this.http.post<any>(`http://localhost:8000/api/admins`, data);
  }

  getAllAdmins() {
    return this.http.get<any>(`http://localhost:8000/api/admins`);
  }

  createAdministrativeStaff(data) {
    return this.http.post<any>(`http://localhost:8000/api/administrative_staff`, data);
  }

  getAllAdministrativeStaff() {
    return this.http.get<any>(`http://localhost:8000/api/administrative_staff`);
  }


}
