import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { StudentService } from 'app/services/student.service';
import { LocalDataSource } from 'ng2-smart-table';
import { pluck } from 'rxjs/operators';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'ngx-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.scss']
})
export class ViewTeachersComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  teachers: any[] = [];
  courses: [];
  courseMediums: [];

  filterParam: string;

  constructor(
    private teacherService: TeacherService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.teacherService.getAllTeachers().subscribe({
      next: (response) => {
        this.teachers = response;
        this.source.load(this.teachers);
        console.log(this.source);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  navigate(event): void {
    let teacherId = event.data.id;
    this.router.navigateByUrl(`/pages/teachers/view/${teacherId}`);
  }

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
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      mobile_no: {
        title: 'Mobile Number',
        type: 'number',
      },
      status: {
        title: 'Status',
        type: 'string',
      }
    }
  };


}
