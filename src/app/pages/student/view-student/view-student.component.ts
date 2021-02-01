import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from '../../../services/lecture.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { pluck } from 'rxjs/operators';
import { SubjectService } from '../../../services/subject.service';

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
    private subjectService: SubjectService) { }

  lecturesOfStudent: any[] = [];
  student;
  displayAddNewForm: boolean = false;
  addNewLecForm: FormGroup;
  courseMediums;
  subjects: any;
  lectures: any;

  ngOnInit(): void {
    this.getStudent();
    this.initAddNewLecForm();
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


  addNewLecture() {
    this.displayAddNewForm = true;
  }

  addLecture() {
    if (this.addNewLecForm.valid) {

    }
  }





}
