import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../../services/user.service';
import { Alert } from '../../course/create-course/create-course.component';

@Component({
  selector: 'ngx-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss']
})
export class UserAccountsComponent implements OnInit {

  createAdminForm: FormGroup;
  createAdminStaffForm: FormGroup;

  selectedRole;

  admins;
  teachers;
  students;
  admin_staffs;
  front_officers;

  constructor(
    private dialogBoxService: NbDialogService,
    private userService: UserService) { }

  userAlert = new Alert;

  ngOnInit(): void {
    this.initAdminForm();
    this.initAdminStaffForm();
  }

  private initAdminForm() {
    this.createAdminForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null),
      'user_name': new FormControl(null, Validators.required),
      'contact_number': new FormControl(null),
      'nic': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required),
    });
  }

  private initAdminStaffForm() {
    this.createAdminStaffForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null),
      'user_name': new FormControl(null, Validators.required),
      'contact_number': new FormControl(null),
      'nic': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required),
    });
  }

  roleSelection(value) {
    this.selectedRole = value;
    if (this.selectedRole == 'admin') {
      this.initAdminForm();
    }
    if (this.selectedRole == 'admin_staff') {
      this.initAdminStaffForm();
    }

    this.userService.getAllUserInfoByRole(value).subscribe({
      next: (response) => {
        switch (value) {
          case 'admin':
            this.admins = response;
            console.log(this.admins)
            break;
          case 'admin_staff':
            this.admin_staffs = response;
            console.log(this.admin_staffs);
            break;
          case 'teacher':
            this.teachers = response;
            console.log(this.teachers);
            break;
          case 'student':
            this.students = response;
            console.log(this.students);
            break;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  addNewRole(ref, data) {

  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.userAlert.status = alertStatus;
    this.userAlert.message = alertMessage;
    setTimeout(() => { this.userAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog, { context: 'Are you sure you want to delete this schedule?' });
  }

  onAddClick(dialog: TemplateRef<any>) {
    this.open(dialog);
  }


  createUser(modal) {
    if (this.createAdminForm.valid) {
      if (this.createAdminForm.value.password == this.createAdminForm.value.confirm_password) {

        let data = {
          "first_name": this.createAdminForm.value.first_name,
          "last_name": this.createAdminForm.value.last_name,
          "user_name": this.createAdminForm.value.user_name,
          "password": this.createAdminForm.value.password,
          "contact_number": this.createAdminForm.value.contact_number,
          "email": this.createAdminForm.value.email,
          "status": 'active',
        };

        if (this.selectedRole == 'admin') {
          console.log(this.selectedRole);
          this.userService.createAdmin(data).subscribe({
            next: (response) => {
              console.log(response);
              modal.close();
              this.setAlert('success', 'Admin User Created Succesfully');
            },
            error: (err) => {
              console.log(err)
            }
          });
        }

        if (this.selectedRole == 'admin_staff') {
          console.log(this.selectedRole);
          this.userService.createAdministrativeStaff(data).subscribe({
            next: (response) => {
              console.log(response);
              modal.close();
              this.setAlert('success', 'Admin Staff User Created Succesfully');
            },
            error: (err) => {
              console.log(err)
            }
          });

        }

      } else {
        this.setAlert('Error', 'Password and Confirm Password dosent match');
      }
    } else {
      this.setAlert('warning', 'Please fill all required fields');
    }

  }


  editClickAdmin() {

  }

  deleteUserAdmin() {

  }

  deleteUserAdminStaff() { }


  editClickAdminStaff() { }

  suspendAccount() {

  }

  activateAccount() {

  }

}
