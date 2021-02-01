import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'app/pages/course/create-course/create-course.component';
import { PaymentSchemeService } from '../../../services/payment-scheme.service';

@Component({
  selector: 'ngx-create-payment-scheme',
  templateUrl: './create-payment-scheme.component.html',
  styleUrls: ['./create-payment-scheme.component.scss']
})
export class CreatePaymentSchemeComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private paymentSchemeService: PaymentSchemeService,
    public createCourseAlert: Alert
  ) { }

  //mediums taken from 'mediums'   table
  availableMediums: [];
  selectedMediums: any[] = [];
  test: string;

  //If a course name already exists
  alreadyExists: boolean = false;


  ngOnInit(): void {
    this.initForm();
  }

  //Initialize create form
  private initForm() {
    this.createForm = new FormGroup({
      'scheme_name': new FormControl(null, Validators.required),
      'no_of_subjects': new FormControl(null, Validators.required),
      'student_fee': new FormControl(null, Validators.required),
      'fixed_institute_amount': new FormControl(null, Validators.required),
      'class_level': new FormControl(null, Validators.required)
    });
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
        "scheme_name": this.createForm.value.scheme_name,
        "no_of_subjects": this.createForm.value.no_of_subjects,
        "student_fee": this.createForm.value.student_fee,
        "fixed_institute_amount": this.createForm.value.fixed_institute_amount,
        "class_level": this.createForm.value.class_level,
      }
      this.paymentSchemeService.createPaymentScheme(data).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.setAlert('success', 'Payment Scheme Created Successfully');
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
