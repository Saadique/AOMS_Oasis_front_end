import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'app/services/course.service';
import { pluck } from 'rxjs/operators';
import { SubjectService } from '../../../services/subject.service';
import { LectureService } from '../../../services/lecture.service';
import { ScheduleService } from '../../../services/schedule.service';
import { Alert } from '../create-course/create-course.component';
import { TeacherService } from '../../../services/teacher.service';
import { RoomService } from '../../../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class AlertCreateLecture {
  status: any;
  message: any;
}

@Component({
  selector: 'ngx-create-lecture',
  templateUrl: './create-lecture.component.html',
  styleUrls: ['./create-lecture.component.scss']
})
export class CreateLectureComponent implements OnInit {

  lectureForm: FormGroup;
  paymentForm: FormGroup;
  scheduleForm: FormGroup;

  courses: [];
  courseMediums: [];
  subjects: [];
  teachers;

  rooms;

  createdLecture = null;


  scheduleStepper: boolean = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private lectureService: LectureService,
    private scheduleService: ScheduleService,
    private teacherService: TeacherService,
    private roomService: RoomService) { }

  createLectureAlert = new Alert();

  ngOnInit(): void {
    this.initLectureForm();
    this.initPaymentForm();
    this.initScheduleForm();
    this.getTodaysDate();
    this.getAllActiveTeachers();
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (response) => {
        this.rooms = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  todaysDate;
  getTodaysDate() {
    var today: any = new Date();
    var dd: any = today.getDate();
    var mm: any = today.getMonth() + 1; //January is 0!
    var yyyy: any = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    this.todaysDate = yyyy + '-' + mm + '-' + dd;
  }

  // initLectureForm() {
  //   this.lectureForm = this.fb.group({
  //     name: ['', [Validators.required]],
  //     course_id: ['', Validators.required],
  //     course_medium_id: ['', Validators.required],
  //     type: ['', Validators.required],
  //     class_type: ['', Validators.required],
  //     subject_id: ['', Validators.required],
  //     teacher_id: ['', Validators.required]
  //   });
  // }

  // initPaymentForm() {
  //   this.paymentForm = this.fb.group({
  //     student_fee: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
  //     fixed_institute_amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
  //     teacher_percentage: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]]
  //   });
  // }

  initLectureForm() {
    this.lectureForm = this.fb.group({
      name: ['', null],
      course_id: ['', null],
      course_medium_id: ['', null],
      type: ['', null],
      class_type: ['', null],
      subject_id: ['', null],
      teacher_id: ['', null]
    });
  }

  initPaymentForm() {
    this.paymentForm = this.fb.group({
      student_fee: ['', null],
      fixed_institute_amount: ['', null],
      teacher_percentage: ['', null]
    });
  }

  initScheduleForm() {
    this.scheduleForm = this.fb.group({
      start_time: ['', [Validators.required]],
      end_time: ['', Validators.required],
      schedule_start_date: ['', Validators.required],
      schedule_end_date: ['', Validators.required],
      room_id: ['', Validators.required]
    });
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

  courseTypeSelection(courseType) {
    this.courseService.getAllCourseByType(courseType)
      .subscribe((response) => {
        this.courses = response;
        console.log(this.courses);
      })
    this.courses = null;
    this.subjects = null;
    this.courseMediums = null;
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
    this.courseSelection(this.lectureForm.value.course_id);
  }

  courseSelection(courseMediumId) {
    this.subjectService.getAllSubjectsByCourseMeidum(courseMediumId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.subjects = response;
      })
  }


  addLecture() {
    if (this.lectureForm.valid) {
      let data = {
        'name': this.lectureForm.value.name,
        'course_medium_id': this.lectureForm.value.course_medium_id,
        'subject_id': this.lectureForm.value.subject_id,
        'teacher_id': this.lectureForm.value.teacher_id,
        'class_type': this.lectureForm.value.class_type,
        'type': this.lectureForm.value.type,
        'student_fee': this.paymentForm.value.student_fee,
        'fixed_institute_amount': this.paymentForm.value.fixed_institute_amount,
        'teacher_percentage': this.paymentForm.value.teacher_percentage,
      }
      console.log(data);
      this.lectureService.createLecture(data).pipe(pluck('data')).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.createdLecture = response;
            this.addSchedule(response.id);
          },
          error: (err) => {
            if (err.error.code == 400) {
              // this.alreadyExists = true;
              // this.setAlert('Error', err.error.message);
            }
          }
        }
      )
    }
  }

  weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  addSchedule(lecture_id) {
    if (this.scheduleForm.valid) {
      let start_date = new Date(this.scheduleForm.value.schedule_start_date);
      let day = this.weekdays[start_date.getDay()];
      let data = {
        'day': day,
        'schedule_start_date': this.scheduleForm.value.schedule_start_date,
        'schedule_end_date': this.scheduleForm.value.schedule_end_date,
        'start_time': this.scheduleForm.value.start_time + ":00",
        'end_time': this.scheduleForm.value.end_time + ":00",
        'room_id': this.scheduleForm.value.room_id,
        'lecture_id': lecture_id,
        'teacher_id': this.lectureForm.value.teacher_id,
      }
      console.log(data);
      this.scheduleService.createSchedule(data).pipe(pluck('data')).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.createdLecture = null;

          },
          error: (err) => {
            if (err.error.code == 400) {
              // this.alreadyExists = true;
              this.setAlert('Error', err.error.message);
            }
            console.log(err);
          }
        }
      )
    }
  }

  onFirstSubmit() {
    if (!this.lectureForm.valid) {
      this.setAlert('warning', 'Please fill all required fields');
    }
    this.lectureForm.markAsDirty();
  }


  onSecondSubmit() {
    if (!this.paymentForm.valid) {
      if (this.paymentForm.get('teacher_percentage').hasError('maxlength')) {
        this.setAlert('warning', 'Percentage Should be numbered value less than 100');
      }
      if (this.paymentForm.get('student_fee').hasError('required')) {
        this.setAlert('warning', 'Please fill all fields');
      }
      if (this.paymentForm.get('fixed_institute_amount').hasError('required')) {
        this.setAlert('warning', 'Please fill all fields');
      }
      if (this.paymentForm.get('teacher_percentage').hasError('required')) {
        this.setAlert('warning', 'Please fill all fields');
      }
    } else {

      this.scheduleStepper = true;
      console.log(this.scheduleStepper);
      this.paymentForm.markAsDirty();
    }
  }

  onThirdSubmit() {
    this.scheduleForm.markAsDirty();
    if (!this.scheduleForm.valid) {
      this.setAlert('warning', 'Please fill all required fields');
    } else {
      if (this.createdLecture == null) {
        this.addLecture();
      } else if (this.createdLecture != null) {
        this.addSchedule(this.createdLecture.id);
      }
    }
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.createLectureAlert.status = alertStatus;
    this.createLectureAlert.message = alertMessage;
    setTimeout(() => { this.createLectureAlert = { "status": null, "message": null } }, 4500); // fade alert
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
