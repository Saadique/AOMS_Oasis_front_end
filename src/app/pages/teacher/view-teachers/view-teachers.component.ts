import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { StudentService } from 'app/services/student.service';
import { LocalDataSource } from 'ng2-smart-table';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'ngx-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.scss']
})
export class ViewTeachersComponent implements OnInit {

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
      edit: false,
      // custom: [{
      //   name: 'client-detail',
      //   title: '<i class="nb-edit"></i>'
      // }
      // ]
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
    let studentId = event.data.id;
    this.router.navigateByUrl(`/pages/student/view/${studentId}`);
  }

}
