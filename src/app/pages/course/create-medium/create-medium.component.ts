import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'app/services/course.service';
import { Alert } from '../create-course/create-course.component';

@Component({
  selector: 'ngx-create-medium',
  templateUrl: './create-medium.component.html',
  styleUrls: ['./create-medium.component.scss']
})
export class CreateMediumComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private courseService: CourseService
  ) { }

  mediumAlert = new Alert();

  ngOnInit(): void {
    this.initForm();
  }

  //Initialize create form
  private initForm() {
    this.createForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'short_name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }



  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.mediumAlert.status = alertStatus;
    this.mediumAlert.message = alertMessage;
    setTimeout(() => { this.mediumAlert = { "status": null, "message": null } }, 4500); // fade alert
  }


  addMedium() {
    if (this.createForm.valid) {
      let data = {
        "name": this.createForm.value.name,
        "short_name": this.createForm.value.short_name,
        "description": this.createForm.value.description,
      }
      this.courseService.createMedium(data).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.setAlert('success', 'Medium Created Successfully');
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




}
