import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { pluck } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service';
import { LectureService } from '../../../services/lecture.service';
import { ScheduleService } from '../../../services/schedule.service';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';

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

  selectSubject = true;

  constructor(
    private courseService: CourseService,
    private lectureService: LectureService,
    private scheduleService: ScheduleService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private dialogBoxService: NbDialogService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCourseMediums().subscribe({
      next: (response) => {
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
      (response) => {
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

  editClickLecture(lecture, modal) {
    this.getAllActiveTeachers();
    this.initLectureForm(lecture);
    this.open(modal);
  }

  editClickSchedule(schedule) {

  }

  editClickPayment(payment) {

  }

  deleteClick() {

  }

  activateClick() {

  }

  updateLecture(modal) {
    let data = {
      "name": this.lectureForm.value.name,
      "type": this.lectureForm.value.type,
      "subject_id": this.selectedSubjectId,
      "teacher_id": this.selectedTeacherId,
    };
    this.lectureService.updateLecture(this.selectedLecture.id, data).subscribe({
      next: (response) => {
        console.log(response);
        this.lectureSelection(this.selectedLecture.id);
        modal.close();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  test(id) {
    console.log(id);
    console.log(this.selectedLecture.subject_id);
  }



}
