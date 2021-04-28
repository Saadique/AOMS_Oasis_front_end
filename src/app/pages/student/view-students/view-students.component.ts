import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss']
})
export class ViewStudentsComponent implements OnInit {

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha'
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne'
    },
  ];

  settings = {
    actions: {
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-info-circle"></i>',
      confirmDelete: true,
    },
    columns: {
      registration_no: {
        title: 'Registration No.',
        type: 'string'
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      mobile_no: {
        title: 'Mobile Number',
        type: 'number',
      },
      school_name: {
        title: 'School Name',
        type: 'string',
      },
      NIC: {
        title: 'NIC No.',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  students: any[] = [];
  courses: [];
  courseMediums: [];

  filterParam: string;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllStudents();
    this.loadAllCourse();
    this.loadAllCourseMediums();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe({
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
      .subscribe((response: any) => {
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
    let studentId = event.data.id;
    this.router.navigateByUrl(`/pages/student/view/${studentId}`);
  }
}