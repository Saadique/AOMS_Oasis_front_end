import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { StudentService } from 'app/services/student.service';
import { LocalDataSource } from 'ng2-smart-table';
import { pluck } from 'rxjs/operators';
import { TeacherService } from '../../../services/teacher.service';
import { LectureService } from '../../../services/lecture.service';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';


@Component({
  selector: 'ngx-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-info-circle"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      type: {
        title: 'Class Type',
        type: 'string',
      },
      class_type: {
        title: 'Class Level',
        type: 'number',
      },
      no_of_students: {
        title: 'Number Of Students',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  students: any[] = [];
  courses: any[];
  courseMediums: [];

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
    this.getAllStudents();
    this.loadAllCourse();
    this.loadAllCourseMediums();
  }

  initTeacher() {
    this.teacher = this.localStorageService.getData().teacher;
  }

  getAllStudents() {
    this.lectureService.getAllLecturesByTeacher(this.teacher.id).subscribe({
      next: (response) => {
        this.students = response;
        this.source.load(this.students);
        console.log(this.source);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  change(value) {
    this.filterParam = value;
  }

  loadAllCourse() {
    this.courseService.getAllCourses()
      .pipe(
        pluck('data')
      )
      .subscribe((response) => {
        this.courses = response;
        console.log(this.courses);
      })
  }

  loadAllCourseMediums() {
    this.courseService.getAllCourseMediums()
      .pipe(
        pluck('data')
      )
      .subscribe((response) => {
        this.courseMediums = response;
        console.log(this.courseMediums);
      })
  }

  filterByCourse(courseId) {
    console.log(courseId);
  }

  filterByCourseMedium(courseMediumId) {
    console.log(courseMediumId);
  }

  navigate(event): void {
    let lectureId = event.data.id;
    this.router.navigateByUrl(`/pages/teacher-portal/my_class/${lectureId}`);
  }

}
