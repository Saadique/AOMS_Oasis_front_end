import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentSchemeService {

  constructor(private http: HttpClient) { }

  createPaymentScheme(paymentScheme) {
    return this.http.post<any>(`http://localhost:8000/api/payment-schemes`, paymentScheme);
  }

  getRelevantPaymentModes(data) {
    return this.http.post<any>(`http://localhost:8000/api/payment-schemes/find/relevant`, data);
  }

  storeStudentSchemeLecture(data) {
    return this.http.post<any>(`http://localhost:8000/api/student-scheme-lecture`, data);
  }



}
