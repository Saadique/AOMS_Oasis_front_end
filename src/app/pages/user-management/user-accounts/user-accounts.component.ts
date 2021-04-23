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
  editAdminForm: FormGroup;

  selectedUpdate;
  selectedDeleteAdmin;
  selectedDeleteAdminStaff;

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
  commonAlert = new Alert;

  ngOnInit(): void {
    this.initAdminForm();
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

  private initAdminEditForm(admin) {
    this.editAdminForm = new FormGroup({
      'first_name': new FormControl(admin.first_name, Validators.required),
      'last_name': new FormControl(admin.last_name),
      'username': new FormControl(admin.user.username),
      'contact_number': new FormControl(admin.contact_number),
      'nic': new FormControl(admin.nic, Validators.required),
      'email': new FormControl(admin.email, Validators.required),
    });
  }



  roleSelection(value) {
    this.selectedRole = value;
    if (this.selectedRole == 'admin' || this.selectedRole == 'admin_staff') {
      this.initAdminForm();
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


  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.userAlert.status = alertStatus;
    this.userAlert.message = alertMessage;
    setTimeout(() => { this.userAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  //alert set
  setCommonAlert(alertStatus, alertMessage): void {
    this.commonAlert.status = alertStatus;
    this.commonAlert.message = alertMessage;
    setTimeout(() => { this.commonAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
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
        };

        if (this.selectedRole == 'admin') {
          console.log(this.selectedRole);
          this.userService.createAdmin(data).subscribe({
            next: (response) => {
              console.log(response);
              modal.close();
              this.roleSelection(this.selectedRole);
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
              this.roleSelection(this.selectedRole);
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

  updateAdmin(ref) {
    let data = {
      "first_name": this.editAdminForm.value.first_name,
      "last_name": this.editAdminForm.value.last_name,
      "contact_number": this.editAdminForm.value.contact_number,
      "nic": this.editAdminForm.value.nic,
      "email": this.editAdminForm.value.email
    }

    if (this.selectedRole == 'admin') {
      this.userService.updateAdmin(this.selectedUpdate.id, data).subscribe({
        next: (reponse) => {
          console.log(reponse);
          this.roleSelection(this.selectedRole);
          ref.close();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }

    if (this.selectedRole == 'admin_staff') {
      this.userService.updateAdministrativeStaff(this.selectedUpdate.id, data).subscribe({
        next: (reponse) => {
          console.log(reponse);
          this.roleSelection(this.selectedRole);
          ref.close();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }


  editClickAdmin(admin, modal) {
    this.initAdminEditForm(admin);
    this.open(modal);
    this.selectedUpdate = admin;
  }

  deleteUserAdmin() {

  }

  deleteUserAdminStaff() {

  }


  editClickAdminStaff(admin_staff) {
    this.initAdminEditForm(admin_staff);
  }

  suspendAccount(user) {
    this.userService.activateAndDeactivateAccount(user.id, 'suspended').subscribe({
      next: (reponse) => {
        console.log(reponse);
        console.log(user);
        this.roleSelection(this.selectedRole);
      },
      error: (err) => {
        console.log(err);
        if (err.status == 400) {
          this.setCommonAlert("Error", err.error.message)
        }
      }
    })
  }

  activateAccount(user) {
    this.userService.activateAndDeactivateAccount(user.id, 'active').subscribe({
      next: (reponse) => {
        console.log(reponse);
        this.roleSelection(this.selectedRole);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
