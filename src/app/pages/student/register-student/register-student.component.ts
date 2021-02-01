import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'app/services/course.service';
import { LectureService } from 'app/services/lecture.service';
import { SubjectService } from 'app/services/subject.service';
import { pluck } from 'rxjs/operators';
import { StudentService } from '../../../services/student.service';
import { PaymentSchemeService } from '../../../services/payment-scheme.service';
import { StudentPaymentsService } from 'app/services/student-payments.service';

@Component({
  selector: 'ngx-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  studentForm: FormGroup;
  studLecturesForm: FormGroup;
  normalPaymentDateForm: FormGroup;
  schemePaymentDateForm: FormGroup;

  courses: [];
  courseMediums: [];
  subjects: [];
  lectures: [];
  selectedLectures: any[] = [];
  selectedLecture: any;
  isArrayEmpty = false;
  selectedLectureIds: any[] = [];

  paymentMode;
  isSchemeMode: boolean = false;
  isNormalMode: boolean = false;

  paymentScheme;
  normalPayments: [];

  // normalPaymentStartDate: string = '';
  // schemePaymentStartDate: string = '';
  // schemePaymentEndDate: string = '';

  // paymentStepperValidation: FormGroup;


  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private lectureService: LectureService,
    private paymentSchemeService: PaymentSchemeService,
    private studentPaymentsService: StudentPaymentsService) { }

  ngOnInit(): void {
    this.checkArrayEmpty();
    this.initStudentForm();
    this.initStudLecturesForm();
    this.initNormalPaymentDateForm();
    this.initSchemePaymentDateForm();
  }

  initStudentForm() {
    this.studentForm = this.fb.group({
      name: ['', null],
      mobileNo: ['', null],
      parentContact: ['', null],
      schoolName: ['', null],
      student_type: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  initNormalPaymentDateForm() {
    this.normalPaymentDateForm = this.fb.group({
      normalPaymentStartDate: ['']
    });
  }

  initSchemePaymentDateForm() {
    this.schemePaymentDateForm = this.fb.group({
      schemePaymentStartDate: [''],
      schemePaymentEndDate: ['']
    });
  }

  courseTypeSelection(courseType) {
    this.courseService.getAllCourseByType(courseType)
      .subscribe((response) => {
        this.courses = response;
        console.log(this.courses);
      })
    this.courses = null;
    this.subjects = null;
    this.courseMediums = null;
    this.lectures = null;
  }

  checkArrayEmpty() {
    if (this.selectedLectures.length == 0) {
      this.isArrayEmpty = true;
    } else {
      this.isArrayEmpty = false;
    }
  }

  // lectures = new FormControl(null, Validators.required);

  initStudLecturesForm() {
    this.studLecturesForm = new FormGroup({
      'super_course': new FormControl(null, null),
      'course': new FormControl(null, null),
      'subject': new FormControl(null, null),
      'lecture': new FormControl(null, null)
    });
  }

  superCourseSelection(courseId) {
    this.courseService.getCoursesWithMediums(courseId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.courseMediums = response;
        console.log(this.courseMediums);
      })
    this.subjects = null;
    this.lectures = null;
  }

  courseSelection(courseMediumId) {
    this.subjectService.getAllSubjectsByCourseMeidum(courseMediumId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.subjects = response;
      });
    this.lectures = null;
  }

  subjectSelection(subjectId) {
    this.lectureService.getAllLecturesBySubject(subjectId)
      .subscribe((response) => {
        this.lectures = response;
        console.log(this.lectures);
      })
  }

  setAlert($rere, $rerer) { };

  addLectureToDisplayList() {
    let lecture_id = this.studLecturesForm.value.lecture;
    this.lectureService.getLectureById(lecture_id)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.selectedLecture = response;
        if (this.selectedLectures.length != 0) {
          let found = false;
          for (var i = 0; i < this.selectedLectures.length; i++) {
            if (this.selectedLectures[i].id == this.selectedLecture.id) {
              this.setAlert('warning', 'This Lecture is already added to the list.');
              found = true;
              break;
            }
          }
          if (found != true) {
            this.selectedLectures.push(this.selectedLecture);
            this.checkArrayEmpty();
          }
        } else {
          this.selectedLectures.push(this.selectedLecture);
          this.checkArrayEmpty();
        }
      });
  }

  removeLecture(lectureId) {
    for (var i = 0; i < this.selectedLectures.length; i++) {
      if (this.selectedLectures[i].id == lectureId) {
        this.selectedLectures.splice(i, 1);
        break;
      }
    }
    this.checkArrayEmpty();
  }

  takeLectureIdsOfSelectedLectures() {
    for (var i = 0; i < this.selectedLectures.length; i++) {
      this.selectedLectureIds.push(this.selectedLectures[i].id)
    }
  }


  addStudent() {
    this.selectedLectureIds = [];
    this.takeLectureIdsOfSelectedLectures();

    if (this.studentForm.valid) {
      // if ((this.isNormalMode && this.normalPaymentStartDate != '') || ((this.isSchemeMode) && (this.schemePaymentStartDate != '' && this.schemePaymentEndDate != ''))) {
      let data = {
        'name': this.studentForm.value.name,
        'school_name': this.studentForm.value.schoolName,
        'mobile_no': this.studentForm.value.mobileNo,
        'email': this.studentForm.value.email,
        'parent_contact': this.studentForm.value.parentContact,
        'student_type': this.studentForm.value.student_type,
        'lectures': this.selectedLectureIds
      }
      console.log(data);
      this.studentService.createStudent(data).pipe(pluck('data')).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.createStudentPaymentData(response.id);
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
      // } else {
      //   console.log("Fill required Date Fileds in Payments");
      // }
    } else {
      // this.setAlert('warning', 'Please fill all required fields');
    }
  }

  getRelevantPaymentModes() {
    this.isSchemeMode = false;
    this.isNormalMode = false;
    this.selectedLectureIds = [];
    this.takeLectureIdsOfSelectedLectures();
    let data = {
      "no_of_lectures": this.selectedLectureIds.length,
      "class_level": this.studentForm.value.student_type,
      "lecture_ids": this.selectedLectureIds
    }
    this.paymentSchemeService.getRelevantPaymentModes(data).subscribe(
      {
        next: (response) => {
          this.paymentMode = response;
          console.log(this.paymentMode);
          this.isSchemeMode = false;
          this.isNormalMode = false;
          this.paymentScheme = null;
          this.normalPayments = [];
          if (this.paymentMode.scheme != null) {
            this.isSchemeMode = true;
            this.paymentScheme = this.paymentMode.scheme;
          }
          if (this.paymentMode.payments != null) {
            this.isNormalMode = true;
            this.normalPayments = this.paymentMode.payments;
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }


  createStudentPaymentData(studentId) {
    if (this.paymentScheme != null) {
      let data1 = {
        "student_id": studentId,
        "payment_type": "scheme",
        "payment_scheme_id": this.paymentScheme.id,
        "payment_amount": this.paymentScheme.student_fee,
        "payment_start_date": this.schemePaymentDateForm.value.schemePaymentStartDate,
        "payment_end_date": this.schemePaymentDateForm.value.schemePaymentEndDate,
      }

      this.studentPaymentsService.storeStudentPayments(data1).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.storeStudentSchemeLecture(studentId, this.paymentScheme.id);
          }
        }
      )
    }

    if (this.normalPayments.length != 0) {
      for (let i = 0; i < this.normalPayments.length; i++) {
        const payment: any = this.normalPayments[i];
        let data2 = {
          "student_id": studentId,
          "payment_type": "normal",
          "payment_id": payment.id,
          "payment_amount": payment.student_fee,
          "payment_start_date": this.normalPaymentDateForm.value.normalPaymentStartDate,
          "payment_end_date": payment.payment_end_date,
        }
        this.studentPaymentsService.storeStudentPayments(data2).subscribe(
          {
            next: (response) => {
              console.log(response);
            }
          }
        )
      }
    }
  }



  storeStudentSchemeLecture(studentId, schemeId) {
    let data = {
      "student_id": studentId,
      "payment_scheme_id": schemeId,
      "lectureIds": this.selectedLectureIds
    }
    this.paymentSchemeService.storeStudentSchemeLecture(data).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }


  decideClass() {
    if (this.isArrayEmpty == true) {
      return 'col-sm';
    }
    return 'col-md-9 col-lg-9 offset-md-0';
  }

  onFirstSubmit() {
    this.studentForm.markAsDirty();
    console.log(this.studentForm);
  }

  onSecondSubmit() {
    this.studLecturesForm.markAsDirty();
    this.getRelevantPaymentModes();
    console.log(this.studLecturesForm)
  }

  onThirdSubmit() {
    this.addStudent();
  }

  test() {
    console.log("clicked");
  }

}
