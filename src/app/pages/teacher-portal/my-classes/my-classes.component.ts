import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { StudentService } from 'app/services/student.service';
import { LectureService } from '../../../services/lecture.service';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';


@Component({
  selector: 'ngx-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

  students: any[] = [];
  courses: any[];
  courseMediums: [];
  lectures;
  filterParam: string;
  teacher;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private lectureService: LectureService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.initTeacher();
    this.getLecturesOfTeacher();
  }

  initTeacher() {
    this.teacher = this.localStorageService.getData().teacher;
  }

  getLecturesOfTeacher() {
    this.lectureService.getAllLecturesByTeacher(this.teacher.id).subscribe({
      next: (response) => {
        this.lectures = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  selectLecture(lectureId) {
    console.log(lectureId);
  }

  navigate(event): void {
    let lectureId = event.data.id;
    this.router.navigateByUrl(`/pages/teacher-portal/my_class/${lectureId}`);
  }

}
