import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { LocalStorageService } from 'app/authentication/services/local-storage/local-storage.service';
import { pluck } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service';
import { LectureService } from '../../../services/lecture.service';
import { ScheduleService } from '../../../services/schedule.service';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';
import { Alert } from '../create-course/create-course.component';

@Component({
  selector: 'ngx-lecture-operations',
  templateUrl: './lecture-operations.component.html',
  styleUrls: ['./lecture-operations.component.scss']
})
export class LectureOperationsComponent implements OnInit {

  lectureForm: FormGroup;
  scheduleForm: FormGroup;
  paymentForm: FormGroup;

  subjectIdSring: string;
  teacherIdString: string;

  selectedSubjectId;
  selectedTeacherId;

  courses;
  courseMediums;
  lectures;
  subjects;
  teachers;

  testS: string = "1";

  selectedLecture;
  selectedPayment;
  selectedSchedule;


  lectureSelectBoxValue;

  selectSubject = true;

  constructor(
    private courseService: CourseService,
    private lectureService: LectureService,
    private scheduleService: ScheduleService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private dialogBoxService: NbDialogService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }

  @ViewChild("selectBox") selectBox;

  loggedInUser;
  role;
  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
  }

  ngOnInit(): void {
    this.getAllCourses();
    this.getUserRoleId();
  }

  getAllCourses() {
    this.courseService.getAllCourseMediums().subscribe({
      next: (response: any) => {
        this.courses = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.courseMediums = null;
    this.lectures = null;
  }


  courseMediumSelection(courseMediumId) {
    this.lectureService.getAllLecByCourseMedium(courseMediumId).subscribe({
      next: (response) => {
        this.lectures = response;
        this.selectedLecture = null;
        this.selectedPayment = null;
        this.selectedSchedule = null;
        console.log(response);
        this.getSubjects(courseMediumId);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  lectureSelection(lectureId) {
    this.lectureService.getLectureById(lectureId).subscribe(
      (response: any) => {
        this.selectedLecture = response.data;
        this.subjectIdSring = this.selectedLecture.subject_id.toString();
        this.teacherIdString = this.selectedLecture.teacher_id.toString();
        console.log(response);
      }
    )

    this.scheduleService.getSchedulesByLecture(lectureId).subscribe(
      (response) => {
        this.selectedSchedule = response;
        console.log(response);
      }
    )

    this.lectureService.getPaymentOfLecture(lectureId).subscribe(
      (response) => {
        this.selectedPayment = response;
        console.log(response);
      }
    )
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
  }

  getSubjects(courseMediumId) {
    this.subjectService.getAllSubjectsByCourseMeidum(courseMediumId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.subjects = response;
      })
  }

  getAllActiveTeachers() {
    this.teacherService.getAllActiveTeachers().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.teachers = response;
        },
        error: (err) => {
          console.log(err)
          if (err.error.code == 400) {
          }
        }
      }
    )
  }

  initLectureForm(lecture) {
    this.lectureForm = this.fb.group({
      name: [lecture.name, Validators.required],
      type: [lecture.type, Validators.required],
      subject_id: [lecture.subject_id, Validators.required],
      teacher_id: [lecture.teacher_id, Validators.required]
    });
    this.selectedSubjectId = lecture.subject_id;
    this.selectedTeacherId = lecture.teacher_id;
  }


  initPaymentForm(payment) {
    this.paymentForm = this.fb.group({
      student_fee: [payment.student_fee, Validators.required],
      fixed_institute_amount: [payment.fixed_institute_amount, Validators.required],
      teacher_percentage: [payment.teacher_percentage, Validators.required],
    });
  }

  initScheduleForm(schedule) {
    this.scheduleForm = this.fb.group({
      start_time: [schedule.start_time, Validators.required],
      end_time: [schedule.end_time, Validators.required],
      schedule_start_date: [schedule.schedule_start_date, Validators.required],
      schedule_end_date: [schedule.schedule_end_date, Validators.required],
      room_id: [schedule.room_id, Validators.required]
    });
  }

  checkSubId(subjectId) {
    if (this.selectedLecture.subject_id == subjectId) {
      return false;
    } else {
      return true;
    }
  }

  selectTeacherEdit(value) {
    console.log(value);
    this.selectedTeacherId = value;
  }

  selectSubjectEdit(value) {
    console.log(value);
    this.selectedSubjectId = value;
  }

  editClickLecture(lecture, modal) {
    this.getAllActiveTeachers();
    this.initLectureForm(lecture);
    this.open(modal);
  }

  editClickSchedule(schedule) {

  }


  paymentAlert = new Alert();
  //alert set
  setPaymentAlert(alertStatus, alertMessage): void {
    this.paymentAlert.status = alertStatus;
    this.paymentAlert.message = alertMessage;
    setTimeout(() => { this.paymentAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  lectureAlert = new Alert();
  setLectureAlert(alertStatus, alertMessage): void {
    this.lectureAlert.status = alertStatus;
    this.lectureAlert.message = alertMessage;
    setTimeout(() => { this.lectureAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  editClickPayment(modal) {
    this.initPaymentForm(this.selectedPayment);
    this.open(modal);
  }

  validateFixedInstituteAmount(fixedInstituteAmount) {
    if (this.paymentForm.value.student_fee != '') {
      if (fixedInstituteAmount > this.paymentForm.value.student_fee) {
        this.paymentForm.controls['student_fee'].setErrors({ 'incorrect': true });
        this.setPaymentAlert('warning', "Fixed Institue Amount Cannot be greater that Student Fee");
      } else {
        this.paymentForm.controls['student_fee'].setErrors(null);
      }
    }
  }

  validateStudentFeeAmount(studentFeeAmount) {
    if (this.paymentForm.value.fixed_institute_amount != '') {
      if (studentFeeAmount < this.paymentForm.value.fixed_institute_amount) {
        this.paymentForm.controls['fixed_institute_amount'].setErrors({ 'incorrect': true });
        this.setPaymentAlert('warning', "Student Fee Cannot be Less that Fixed Institute Amount");
      } else {
        this.paymentForm.controls['fixed_institute_amount'].setErrors(null);
      }
    }
  }

  validatePercentage(value) {
    if (value < 0) {
      this.paymentForm.controls['teacher_percentage'].setErrors({ 'incorrect': true });
      this.setPaymentAlert('warning', "Percentage Cannot be less than 0");
    } else {
      this.paymentForm.controls['teacher_percentage'].setErrors(null);
    }
  }

  updatePayment(modal) {
    if (this.paymentForm.valid) {
      let data = {
        "student_fee": this.paymentForm.value.student_fee,
        "fixed_institute_amount": this.paymentForm.value.fixed_institute_amount,
        "teacher_percentage": this.paymentForm.value.teacher_percentage,
      }

      this.lectureService.updateLecturePayment(this.selectedPayment.id, data).subscribe({
        next: (response) => {
          this.lectureSelection(this.selectedLecture.id);
          modal.close();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  deleteClick(lecture) {
    this.lectureService.changeLectureDeleteStatus(lecture.id, "deleted").subscribe({
      next: (response) => {
        this.lectureSelection(this.selectedLecture.id);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  activateClick(lecture) {
    this.lectureService.changeLectureDeleteStatus(lecture.id, "active").subscribe({
      next: (response) => {
        this.lectureSelection(this.selectedLecture.id);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateLecture(modal) {
    let data = {
      "name": this.lectureForm.value.name,
      "type": this.lectureForm.value.type,
      "subject_id": this.selectedSubjectId,
      "teacher_id": this.selectedTeacherId,
      "course_medium_id": this.selectedLecture.course_medium_id
    };
    console.log(data);
    this.lectureService.updateLecture(this.selectedLecture.id, data).subscribe({
      next: (response) => {
        console.log(response);
        this.lectureSelection(this.selectedLecture.id);
        modal.close();
      },
      error: (error) => {
        console.log(error);
        if (error.status == 400) {
          this.setLectureAlert('Error', error.error.message)
        }
      }
    })
  }

  test(id) {
    console.log(id);
    console.log(this.selectedLecture.subject_id);
  }



}
