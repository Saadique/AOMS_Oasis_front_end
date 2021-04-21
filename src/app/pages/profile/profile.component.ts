import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../authentication/services/local-storage/local-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Alert } from '../course/create-course/create-course.component';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  studentForm: FormGroup;
  teacherEditForm: FormGroup;

  constructor(private localStorageService: LocalStorageService,
    private studentService: StudentService,
    private teacherService: TeacherService) { }

  editStudentAlert = new Alert();
  editTeacherAlert = new Alert();

  ngOnInit(): void {
    this.getUserRoleId();
  }

  admin
  teacher;
  student;

  loggedInUser;
  role;

  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
    this.getUser();
  }

  initStudentForm() {
    this.studentForm = new FormGroup({
      'registration_no': new FormControl(this.student.registration_no),
      'name': new FormControl(this.student.name, Validators.required),
      'mobile_no': new FormControl(this.student.mobile_no, Validators.required),
      'school_name': new FormControl(this.student.school_name, null),
      'student_type': new FormControl(this.student.student_type, Validators.required),
      'email': new FormControl(this.student.email, Validators.required)
    });
  }

  initTeacherForm() {
    this.teacherEditForm = new FormGroup({
      'name': new FormControl(this.teacher.name, Validators.required),
      'mobile_no': new FormControl(this.teacher.mobile_no, Validators.required),
      'address': new FormControl(this.teacher.address, null),
      'email': new FormControl(this.teacher.email, Validators.required),
    });
  }

  setEditStudentAlert(alertStatus, alertMessage): void {
    this.editStudentAlert.status = alertStatus;
    this.editStudentAlert.message = alertMessage;
    setTimeout(() => { this.editStudentAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  setEditTeacherAlert(alertStatus, alertMessage): void {
    this.editTeacherAlert.status = alertStatus;
    this.editTeacherAlert.message = alertMessage;
    setTimeout(() => { this.editTeacherAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  getUser() {
    if (this.role == "Admin") {
      this.admin = this.loggedInUser.admin;
    }
    if (this.role == "Student") {
      this.student = this.loggedInUser.student;
      this.initStudentForm();
    }
    if (this.role == "Teacher") {
      this.teacher = this.loggedInUser.teacher;
      this.initTeacherForm();
    }
  }

  saveStudentProfile() {
    if (this.studentForm.valid) {
      let data = {
        "name": this.studentForm.value.name,
        "mobile_no": this.studentForm.value.mobile_no,
        "school_name": this.studentForm.value.school_name,
        "email": this.studentForm.value.email,
      }
      this.studentService.updateStudent(data, this.student.id).subscribe({
        next: (response) => {
          this.setEditStudentAlert('success', "Profile Updated Successfully");
          this.loggedInUser.student = response;
          this.localStorageService.setData(this.loggedInUser);
          this.student = response;
        },
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            this.setEditStudentAlert('error', err.error.message);
          }
        }
      })
    }

  }

  saveTeacherProfile() {
    if (this.teacherEditForm.valid) {
      let data = {
        "name": this.teacherEditForm.value.name,
        "mobile_no": this.teacherEditForm.value.mobile_no,
        "address": this.teacherEditForm.value.address,
        "email": this.teacherEditForm.value.email,
      }
      this.teacherService.updateTeacher(data, this.teacher.id).subscribe({
        next: (response) => {
          this.setEditTeacherAlert('success', "Profile Updated Successfully");
          this.loggedInUser.teacher = response;
          this.localStorageService.setData(this.loggedInUser);
          this.teacher = response;
        },
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            this.setEditTeacherAlert('error', err.error.message);
          }
        }
      })
    }
  }

}
