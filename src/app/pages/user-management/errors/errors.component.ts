import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Error {
  status: any;
  message: any;
}

@Component({
  selector: 'ngx-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  constructor(public errorAlert: Error) { }

  ngOnInit(): void {
    // this.setAlert('error', "A lecture with type 'normal', course 'Grade-12 ENG', subject 'Economics' and teacher 'Menaka', already EXISTS!");
    this.setAlert('success', "Room Updated Successfully !");
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.errorAlert.status = alertStatus;
    this.errorAlert.message = alertMessage;
    setTimeout(() => { this.errorAlert = { "status": null, "message": null } }, 8000000); // fade alert
  }


}
