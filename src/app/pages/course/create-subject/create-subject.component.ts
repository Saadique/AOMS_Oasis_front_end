import { Component, OnInit, Injectable } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { pluck } from 'rxjs/operators';
import { SubjectService } from '../../../services/subject.service';
import { Alert } from '../create-course/create-course.component';

@Component({
  selector: 'ngx-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {

  createForm: FormGroup;
  courses: [];
  courseMediums: [];
  alertSub = new Alert();

  constructor(
    private courseService: CourseService,
    private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadAllCourse();
  }

  //Initialize create form
  private initForm() {
    this.createForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'type': new FormControl(null, Validators.required),
      'course_id': new FormControl(null, Validators.required),
      'course_medium_id': new FormControl(null, Validators.required)
    });
  }

  setAlert(alertStatus, alertMessage): void {
    this.alertSub.status = alertStatus;
    this.alertSub.message = alertMessage;
    setTimeout(() => { this.alertSub = { "status": null, "message": null } }, 4500); // fade alert
  }

  addSubject() {
    if (this.createForm.valid) {
      let data = {
        'name': this.createForm.value.name,
        'description': this.createForm.value.description,
        'type': this.createForm.value.type,
        'course_medium_id': this.createForm.value.course_medium_id,
        'subject_type': this.createForm.value.subject_type
      }
      this.subjectService.createSubject(data).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.setAlert('success', `Subject ${response.name} Has Been Created Successfully`);
            this.createForm.reset();
          },
          error: (err) => {
            if (err.error.code == 400) {
              // this.alreadyExists = true;
              this.setAlert('error', err.error.message);
            }
          }
        }
      )
    } else {
      this.setAlert('warning', 'Please fill all required fields!');
    }
  }


  loadAllCourse() {
    this.courseService.getAllCourses()
      .pipe(
        pluck('data')
      )
      .subscribe((response) => {
        this.courses = response;
        console.log(this.courses);
      })
  }

  superCourseSelection(courseId) {
    this.createForm.controls['course_medium_id'].setValue('');
    this.courseService.getCoursesWithMediums(courseId)
      .pipe(
        pluck('data')
      ).subscribe((response: any) => {
        this.courseMediums = response;
        console.log(this.courseMediums);
      })
  }

}
