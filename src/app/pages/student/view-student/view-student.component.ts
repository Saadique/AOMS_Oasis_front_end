import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from '../../../services/lecture.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { pluck } from 'rxjs/operators';
import { SubjectService } from '../../../services/subject.service';
import { NbDialogService } from '@nebular/theme';
import { Alert } from '../../course/create-course/create-course.component';
import { StudentPaymentsService } from '../../../services/student-payments.service';
import { ScheduleService } from '../../../services/schedule.service';
import { AttendanceService } from '../../../services/attendance.service';
import { LocalStorageService } from 'app/authentication/services/local-storage/local-storage.service';
import { PaymentSchemeService } from '../../../services/payment-scheme.service';

@Component({
  selector: 'ngx-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private lectureService: LectureService,
    private studentService: StudentService,
    private studentPaymentsService: StudentPaymentsService,
    private fb: FormBuilder,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private scheduleService: ScheduleService,
    private attendanceService: AttendanceService,
    private paymentSchemeService: PaymentSchemeService,
    private dialogBoxService: NbDialogService,
    private localStorageService: LocalStorageService) { }

  lecturesOfStudent: any[] = [];
  addLecAlert = new Alert();
  lecAlert = new Alert();
  editAlert = new Alert();

  studentId;
  student;
  addNewLecForm: FormGroup;
  monthlyPaymentForm: FormGroup;
  studentViewForm: FormGroup;

  courseMediums;
  subjects: any;
  lectures: any;
  studentPayments;
  monthlyPayments;
  selectedPayment;
  selectedLecture; //Attendence
  selectedDate;    //Attendence
  schedule;
  scheduleDay;
  attendanceStatus;
  dailySchedulesByLec = "default";

  testE: string = 'ppp';

  isSchemeMode;
  isNormalMode;

  duePayments: [] = [];
  paidPayments: [] = [];
  selectedLectureIds: any[] = [];

  loggedInUser;
  role;
  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
  }

  ngOnInit(): void {
    this.getStudent();
    this.getUserRoleId();
    this.initAddNewLecForm();
  }

  initAddNewLecForm() {
    this.addNewLecForm = this.fb.group({
      'course_medium_id': ['', null],
      'subject_id': ['', null],
      'lecture_id': ['', null]
    })
  }

  initMonthlyPaymentForm() {
    this.monthlyPaymentForm = this.fb.group({
      'month': ['', null]
    })
  }

  // initStudentViewForm() {
  //   this.studentViewForm = this.fb.group({
  //     'registration_no': [this.student.registration_no],
  //     'name': [this.student.name],
  //     'mobileNo': [this.student.mobile_no],
  //     'schoolName': [this.student.school_name],
  //     'student_type': [this.student.student_type],
  //     'email': [this.student.email]
  //   });
  // }

  initStudentViewForm() {
    this.studentViewForm = new FormGroup({
      'registration_no': new FormControl(this.student.registration_no),
      // 'name': new FormControl(this.student.name, Validators.required),
      // 'mobileNo': new FormControl(this.student.mobile_no, Validators.required),
      // 'schoolName': new FormControl(this.student.school_name, null),
      // 'student_type': new FormControl(this.student.student_type, Validators.required),
      // 'email': new FormControl(this.student.email, Validators.required)
    });
    console.log(this.studentViewForm);
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog, { context: 'Add New Lecture' });
  }

  //alert set
  setAlertModal(alertStatus, alertMessage): void {
    this.addLecAlert.status = alertStatus;
    this.addLecAlert.message = alertMessage;
    setTimeout(() => { this.addLecAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  setAlert(alertStatus, alertMessage): void {
    this.lecAlert.status = alertStatus;
    this.lecAlert.message = alertMessage;
    setTimeout(() => { this.lecAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  setEditAlert(alertStatus, alertMessage): void {
    this.editAlert.status = alertStatus;
    this.editAlert.message = alertMessage;
    setTimeout(() => { this.editAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  onAddClick(dialog: TemplateRef<any>) {
    this.open(dialog);
  }

  getStudent() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(this.studentId).subscribe((response) => {
      console.log(response);
      this.student = response;
      this.initStudentViewForm();
      this.getPaymentsOfStudent(this.studentId);
      this.getLecturesOfStudent();
      this.getDueMonthlyPayments();
      this.getPaidMonthlyPayments();
    })
  }

  editStudent() {
    if (this.student.name != '' && this.student.mobile_no != '' && this.student.school_name != '' && this.student.email != '') {
      this.studentService.updateStudent(this.student, this.student.id).subscribe({
        next: (response) => {
          this.student = response;
          this.getStudent();
          this.setEditAlert('success', 'Student Updated Sucessfully');
        },
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            this.setEditAlert('err', err.error);
          }
        }
      })
    } else {
      this.setEditAlert('warning', 'Please Fill All Required Fields')
    }
  }


  getLecturesOfStudent() {
    this.lectureService.getAllLectureByStudent(this.student.id).subscribe((response) => {
      console.log(response);
      this.lecturesOfStudent = response;
      this.loadCourses();
    })
  }

  loadCourses() {
    console.log(this.lecturesOfStudent.length);
    if (this.lecturesOfStudent.length != 0) {
      let courseId = this.lecturesOfStudent[0].course_medium.course_id;
      this.courseService.getCoursesWithMediums(courseId)
        .pipe(
          pluck('data')
        ).subscribe((response) => {
          this.courseMediums = response;
          console.log(this.courseMediums);
        })
    }
  }

  loadSubjects(courseMediumId) {
    this.subjectService.getAllSubjectsByCourseMeidum(courseMediumId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.subjects = response;
      })
  }

  loadLectures(subjectId) {
    this.lectureService.getAllLecturesBySubject(subjectId)
      .subscribe((response) => {
        this.lectures = response;
        console.log(this.lectures);
      })
  }

  lectureSelection() {

  }


  checkLectureExistence(lectureId) {
    let found = false;
    for (let i = 0; i < this.lecturesOfStudent.length; i++) {
      if (lectureId == this.lecturesOfStudent[i].id) {
        found = true;
        break;
      }
    }
    return found;
  }

  takeLectureIdsOfSelectedLectures() {
    for (var i = 0; i < this.lecturesOfStudent.length; i++) {
      this.selectedLectureIds.push(this.lecturesOfStudent[i].id)
    }
  }

  addLecture(ref) {
    if (this.addNewLecForm.valid) {
      let lectureId = this.addNewLecForm.value.lecture_id;
      if (!this.checkLectureExistence(lectureId)) {
        let data = {
          "student_id": this.student.id,
          "lecture_id": lectureId
        }

        this.studentService.addLecture(data).subscribe(
          {
            next: (response) => {
              lectureId = null;
              ref.close();
              this.takeLectureIdsOfSelectedLectures();
              this.getLecturesOfStudent();
            },
            error: (error) => {
              console.log(error);
            }
          }
        )
      } else {
        this.setAlertModal('error', 'This student is already enrolled to this lecture.')
      }
    } else {

    }
  }

  removeLecture(lecture) {
    let data = {
      "student_id": this.student.id,
      "lecture_id": lecture.id
    }
    this.studentService.removeLecture(data).subscribe({
      next: (response) => {
        this.getLecturesOfStudent();
        this.setAlert('success', 'Lecture was removed successfully');
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  getPaymentsOfStudent($studentId) {
    this.studentPaymentsService.getStudentPayments($studentId).subscribe((response) => {
      console.log(response);
      this.studentPayments = response;
    },
      (error) => {
        console.log(error);
      })
  }

  getMonthlyPayments(studentPayment) {
    this.selectedPayment = studentPayment;
    this.studentPaymentsService.getMonthlyPayments(studentPayment.id).subscribe((response) => {
      console.log(response);
      this.monthlyPayments = response;
    })
  }

  getDueMonthlyPayments() {
    this.studentPaymentsService.getMonthlyDuePayments(this.studentId).subscribe((response) => {
      console.log(response);
      this.duePayments = response;
    })
  }

  getPaidMonthlyPayments() {
    this.studentPaymentsService.getMonthlyPaidPayments(this.studentId).subscribe((response) => {
      console.log(response);
      this.paidPayments = response;
    },
      (error) => {
        console.log(error);
      })
  }

  payFee(dialog: TemplateRef<any>, studentPaymentId) {
    this.initMonthlyPaymentForm();
    this.getMonthlyPayments(studentPaymentId);
    this.open(dialog);
  }

  payMonthlyFee(ref) {
    if (this.monthlyPaymentForm.valid) {
      let today = new Date();
      let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
      console.log(date);
      let data = {
        "monthlyPaymentId": this.monthlyPaymentForm.value.month,
        "status": "payed",
        "payment_date": today
      }
      this.studentPaymentsService.payFee(data.monthlyPaymentId, data).subscribe((response) => {
        ref.close();
        console.log(response);
      })
    }
  }

  skipMonthPayment() {

  }


  //--Attendances--

  getSchedulesOfLecture(lectureId) {
    this.scheduleService.getSchedulesByLecture(lectureId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.schedule = response;
          let date = new Date(this.schedule.schedule_start_date);
          this.scheduleDay = this.daysOfWeek[date.getDay()];
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  getDailySchedulesByDate(date, lecture, studentId) {
    this.scheduleService.getScheduleByDateAndLecture(date, lecture, studentId).subscribe(
      {
        next: (response) => {
          if (response.length != 0) {
            this.dailySchedulesByLec = response;
          } else {
            this.dailySchedulesByLec = null;
          }
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday"
  ];

  selectLecture(lectureId) {
    this.dailySchedulesByLec = "default";
    console.log(lectureId);
    this.selectedLecture = lectureId;
    this.getSchedulesOfLecture(lectureId);
  }


  selectDate(date) {
    console.log(this.studentId)
    this.getDailySchedulesByDate(date, this.selectedLecture, this.studentId);
  }

  markAttendance(schedule) {
    let data = {
      student_id: this.studentId,
      daily_schedule_id: schedule.id,
      attendance_status: schedule.attendance
    }
    this.attendanceService.markAttendance(data).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.setAlert('success', 'Attendance was marked!')
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  test() {
    if (this.studentViewForm.valid) {
      console.log(this.studentViewForm.value.name);
    }
  }

}
