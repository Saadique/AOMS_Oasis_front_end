import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from '../../../services/lecture.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { pluck } from 'rxjs/operators';
import { SubjectService } from '../../../services/subject.service';
import { NbDialogService } from '@nebular/theme';
import { Alert } from '../../course/create-course/create-course.component';
import { StudentPaymentsService } from '../../../services/student-payments.service';

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
    private dialogBoxService: NbDialogService) { }

  lecturesOfStudent: any[] = [];
  addLecAlert = new Alert();
  lecAlert = new Alert();

  student;
  addNewLecForm: FormGroup;
  monthlyPaymentForm: FormGroup;
  courseMediums;
  subjects: any;
  lectures: any;
  studentPayments;
  monthlyPayments;
  selectedPayment;

  ngOnInit(): void {
    this.getStudent();
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

  onAddClick(dialog: TemplateRef<any>) {
    this.open(dialog);
  }

  getStudent() {
    let studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(studentId).subscribe((response) => {
      console.log(response);
      this.student = response;
      this.getPaymentsOfStudent(studentId);
      this.getLecturesOfStudent(studentId);
    })
  }

  getPaymentsOfStudent($studentId) {
    this.studentPaymentsService.getStudentPayments($studentId).subscribe((response) => {
      console.log(response);
      this.studentPayments = response;
    })
  }

  getLecturesOfStudent(studentId) {
    this.lectureService.getAllLectureByStudent(studentId).subscribe((response) => {
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
              ref.close();
              this.lectureService.getAllLectureByStudent(this.student.id).subscribe((response) => {
                console.log(response);
                this.setAlert('success', 'Lecture was added successfully');
                this.lecturesOfStudent = response;
              })
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

  getMonthlyPayments(studentPayment) {
    this.selectedPayment = studentPayment;
    this.studentPaymentsService.getMonthlyPayments(studentPayment.id).subscribe((response) => {
      console.log(response);
      this.monthlyPayments = response;
    })
  }

  payFee(dialog: TemplateRef<any>, studentPaymentId) {
    this.getMonthlyPayments(studentPaymentId);
    this.open(dialog);
  }

  payMonthlyFee() {

  }

  skipMonthPayment() {

  }


}
