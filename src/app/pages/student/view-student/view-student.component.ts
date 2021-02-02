import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from '../../../services/lecture.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { pluck } from 'rxjs/operators';
import { SubjectService } from '../../../services/subject.service';
import { NbDialogService } from '@nebular/theme';

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
    private fb: FormBuilder,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private dialogBoxService: NbDialogService) { }

  lecturesOfStudent: any[] = [];
  student;
  addNewLecForm: FormGroup;
  courseMediums;
  subjects: any;
  lectures: any;

  ngOnInit(): void {
    this.getStudent();
    this.initAddNewLecForm();
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog, { context: 'Are you sure you want to delete this schedule?' });
  }

  onAddClick(dialog: TemplateRef<any>) {
    this.open(dialog);
  }

  getStudent() {
    let studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(studentId).subscribe((response) => {
      console.log(response);
      this.student = response;
      this.getLecturesOfStudent(studentId);
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

  initAddNewLecForm() {
    this.addNewLecForm = this.fb.group({
      'course_medium_id': ['', null],
      'subject_id': ['', null],
      'lecture_id': ['', null]
    })
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

  addLecture() {
    if (this.addNewLecForm.valid) {
      let lectureId = this.addNewLecForm.value.lecture_id;
      if (!this.checkLectureExistence(lectureId)) {

      }
    } else {

    }
  }





}
