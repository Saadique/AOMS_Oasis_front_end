import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  constructor(
    public createTeacherAlert: Alert,
    private fb: FormBuilder,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.initTeacherDetailsForm();
  }

  initTeacherDetailsForm() {
    this.teacherDetailsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      nic: ['', Validators.required],
      mobile_no: ['', Validators.required],
      address: ['', null]
    });
  }


  trimSpaces(text) {
    const newText = text.split(/\s/).join('');
    return newText;
  }

  submitTeacherForm() {
    if (this.teacherDetailsForm.valid) {
      let data = {
        'name': this.teacherDetailsForm.value.name,
        'nic': this.trimSpaces(this.teacherDetailsForm.value.nic),
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
            this.teacherDetailsForm.reset();
            this.setAlert('success', "Teacher Registered Successfully");
          },
          error: (err) => {
            console.log(err);
            if (err.status == 400) {
              this.setAlert('Error', err.error.message);
            }
          }
        }
      )
    } else {
      this.setAlert('warning', 'Please fill all required fields');
    }
  }





  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.createTeacherAlert.status = alertStatus;
    this.createTeacherAlert.message = alertMessage;
    setTimeout(() => { this.createTeacherAlert = { "status": null, "message": null } }, 4500); // fade alert
  }




}
