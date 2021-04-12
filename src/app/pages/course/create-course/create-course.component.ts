import { Component, OnInit, Injectable } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { pluck } from 'rxjs/operators';
import { LoginServiceService } from '../../../authentication/services/login/login-service.service';


@Injectable({
  providedIn: 'root'
})
export class Alert {
  status: any;
  message: any;
}

@Component({
  selector: 'ngx-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})

export class CreateCourseComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private courseService: CourseService,
    private loginService: LoginServiceService
  ) { }

  createCourseAlert = new Alert();

  //mediums taken from 'mediums'   table
  availableMediums: [];
  selectedMediums: any[] = [];
  test: string;

  //If a course name already exists
  alreadyExists: boolean = false;


  ngOnInit(): void {
    this.loadMediums();
    this.initForm();
  }

  //Initialize create form
  private initForm() {
    this.createForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'course_type': new FormControl(null, Validators.required),
      'formMediums': new FormControl(null)
    });
  }


  addMedium(mediumId, isChecked) {
    if (isChecked == true) {
      this.selectedMediums.push(mediumId);
    } else {
      const index = this.selectedMediums.indexOf(mediumId);
      this.selectedMediums.splice(index, 1);
    }
    console.log(this.selectedMediums);
  }


  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.createCourseAlert.status = alertStatus;
    this.createCourseAlert.message = alertMessage;
    setTimeout(() => { this.createCourseAlert = { "status": null, "message": null } }, 4500); // fade alert
  }


  addCourse() {
    if (this.createForm.valid && Array.isArray(this.selectedMediums)) {
      let data = {
        "name": this.createForm.value.name,
        "description": this.createForm.value.description,
        "course_type": this.createForm.value.course_type,
        "mediums": this.selectedMediums
      }
      this.courseService.createCourse(data).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.setAlert('success', 'Course Created Successfully');
            this.createForm.reset();
          },
          error: (err) => {
            if (err.error.code == 400) {
              // this.alreadyExists = true;
              this.setAlert('Error', err.error.message);
            }
          }
        }
      )
    } else {
      this.setAlert('warning', 'Please fill all required fields');
    }
  }

  testL() {
    console.log(this.loginService.isLoginSuccess());
  }


  loadMediums() {
    this.courseService.getAllMediums()
      .pipe(
        pluck('data')
      )
      .subscribe((response) => {
        this.availableMediums = response;
      })
  }


}
