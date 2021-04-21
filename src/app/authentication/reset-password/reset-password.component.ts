import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Alert } from '../../pages/course/create-course/create-course.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  username;
  enteredUsername;
  isCodeSent = false;
  code: number = null;
  enteredCode: number = null;
  isCodeValid = false;

  password;
  confirmPassword;
  ngOnInit(): void {
  }

  alert = new Alert();

  submitUsername() {
    this.enteredUsername = this.username
    this.userService.mailCode(this.enteredUsername).subscribe({
      next: (response) => {
        this.isCodeSent = true;
        this.code = response.code;
        this.setAlert('success', 'Code Sent Successfully');
      },
      error: (err) => {
        console.log(err)
        if (err.status == 400) {
          this.setAlert('error', err.error.message);
        }
      }
    })
  }


  submitCode() {
    if (this.enteredCode == this.code) {
      this.isCodeValid = true;
    } else {
      this.setAlert('error', 'The code you entered is invalid');
    }
  }

  resetPassword() {
    if (this.password != this.confirmPassword) {
      this.setAlert('error', 'Password Mismatch');
    } else {
      let data = {
        'username': this.enteredUsername,
        'password': this.password
      }
      this.userService.submitPassword(data).subscribe({
        next: (response) => {
          this.setAlert('success', 'Password Successfully Changed');
          this.router.navigateByUrl('/authentication/login');
        },
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            this.setAlert('error', err.error.message);
          }
        }
      })
    }
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.alert.status = alertStatus;
    this.alert.message = alertMessage;
    setTimeout(() => { this.alert = { "status": null, "message": null } }, 4500); // fade alert
  }
}
