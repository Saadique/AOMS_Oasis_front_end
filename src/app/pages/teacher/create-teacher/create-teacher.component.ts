import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alert } from 'app/pages/course/create-course/create-course.component';
import { pluck } from 'rxjs/operators';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'ngx-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {

  teacherDetailsForm: FormGroup;
  teacherQualificationForm: FormGroup;
  teacherSubjectsForm: FormGroup;

  courses: [];
  courseMediums: [];
  subjects: [];

  teacher = null;


  scheduleStepper: boolean = false;

  constructor(
    public createTeacherAlert: Alert,
    private fb: FormBuilder,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.initTeacherDetailsForm();
    this.initTeacherQualificationForm();
    this.initTeacherSubjectsForm();
  }

  initTeacherDetailsForm() {
    this.teacherDetailsForm = this.fb.group({
      name: ['', null],
      email: ['', null],
      mobile_no: ['', null],
      address: ['', null]
    });
  }

  initTeacherQualificationForm() {
    this.teacherQualificationForm = this.fb.group({
      highestQualification: ['', null]
    });
  }

  initTeacherSubjectsForm() {
    this.teacherSubjectsForm = this.fb.group({
      subjects: ['', null]
    });
  }

  createTeacher() {
    if (this.teacherDetailsForm.valid) {
      let data = {
        'name': this.teacherDetailsForm.value.name,
        'email': this.teacherDetailsForm.value.email,
        'mobile_no': this.teacherDetailsForm.value.mobile_no,
        'address': this.teacherDetailsForm.value.address
      }
      console.log(data);
      this.teacherService.createTeacher(data).pipe(pluck('data')).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.teacher = response;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    }
  }

  onFirstSubmit() {
    if (!this.teacherDetailsForm.valid) {
      this.setAlert('warning', 'Please fill all required fields');
    }
    this.teacherDetailsForm.markAsDirty();
  }

  onSecondSubmit() {
    if (!this.teacherQualificationForm.valid) {
      this.setAlert('warning', 'Please fill all required fields');
    }
    this.teacherQualificationForm.markAsDirty();
  }

  onThirdSubmit() {
    if (!this.teacherSubjectsForm.valid) {
      this.setAlert('warning', 'Please fill all required fields');
    }
    this.createTeacher();
    this.teacherSubjectsForm.markAsDirty();
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.createTeacherAlert.status = alertStatus;
    this.createTeacherAlert.message = alertMessage;
    setTimeout(() => { this.createTeacherAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  scheduleStepperClass() {
    if (this.scheduleStepper) {
      return 'col-md-5 col-lg-5';
    }
    return 'col-md-10 col-lg-10 col-xxxl-7 offset-md-1';
  }

  moveOut() {
    this.scheduleStepper = false;
  }

  moveIn() {
    this.scheduleStepper = true;
  }

}
