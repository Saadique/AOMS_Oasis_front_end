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

  createAdministrativeStaff(data) {
    return this.http.post<any>(`http://localhost:8000/api/administrative_staff`, data);
  }

  updateAdmin(adminId, data) {
    return this.http.put<any>(`http://localhost:8000/api/admins/${adminId}`, data);
  }

  updateAdministrativeStaff(adminStaffId, data) {
    return this.http.post<any>(`http://localhost:8000/api/administrative_staff/${adminStaffId}`, data);
  }

  getAllAdmins() {
    return this.http.get<any>(`http://localhost:8000/api/admins`);
  }


  getAllAdministrativeStaff() {
    return this.http.get<any>(`http://localhost:8000/api/administrative_staff`);
  }

  getAllUserInfoByRole(role) {
    return this.http.get<any>(`http://localhost:8000/api/users/role/${role}`);
  }

  activateAndDeactivateAccount(userId, status) {
    return this.http.get<any>(`http://localhost:8000/api/users/status/${status}/${userId}`);
  }

  mailCode(username) {
    return this.http.get<any>(`http://localhost:8000/api/users/reset_password/mail_code/${username}`);
  }

  submitCode(data) {
    return this.http.post<any>(`http://localhost:8000/api/users/reset_password/code`, data);
  }

  submitPassword(data) {
    return this.http.post<any>(`http://localhost:8000/api/users/reset_password/reset`, data);
  }

  getAdminDashboardData() {
    return this.http.get<any>(`http://localhost:8000/api/admins/dashboard/data`);
  }



}
