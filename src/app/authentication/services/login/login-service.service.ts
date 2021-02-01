import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error('Backend returned code error' + error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  // login
  authenticate(loginData: any) {
    return this.httpClient.post(`http://localhost:8000/api/user/login`, loginData);
  }

  isLoginSuccess() {
    if (window.localStorage.getItem('token-oasis') === null) {
      console.log("true");
      return false;
    }
    return true;
  }

  // Logout user
  logout() {
    // this.localStorageService.removeLocalStorageData();
    this.router.navigate(['/login']);
  }

}
