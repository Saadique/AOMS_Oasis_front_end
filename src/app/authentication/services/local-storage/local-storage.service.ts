import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//api SERVER URL
const API_SERVER_URL: string = "//localhost:8000/api";


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private router: Router
  ) { }

  setToken(token: any): void {
    window.localStorage.setItem('token-oasis', token);
  }

  getToken(): string {
    return window.localStorage.getItem('token-oasis');
  }

  //set data
  setData(data: any): void {
    window.localStorage.setItem('user-data', JSON.stringify(data));
  }

  getData(): any {
    return JSON.parse(window.localStorage.getItem('user-data'));
  }

  //authenticate login -- true / false
  authenticateLogin(): boolean {
    if (this.getData() != null && this.getToken() != null) {
      return true;
    } else {
      return false;
    }
  }

  //logout
  clearLogin(): void {
    window.localStorage.clear();
  }

  //get server api url
  getApiServerUrl(): string {
    return API_SERVER_URL;
  }
}
