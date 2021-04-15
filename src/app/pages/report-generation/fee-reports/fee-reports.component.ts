import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CourseService } from 'app/services/course.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'ngx-fee-reports',
  templateUrl: './fee-reports.component.html',
  styleUrls: ['./fee-reports.component.scss']
})
export class FeeReportsComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      registration_no: {
        title: 'STD Reg No.',
        type: 'string',
      },
      student_name: {
        title: 'STD Name',
        type: 'string',
      },
      mode: {
        title: 'Payment Mode',
        type: 'number',
      },
      payment_name: {
        title: 'Payment Name',
        type: 'string'
      },
      amount: {
        title: 'Fee Amount',
        type: 'string',
      },
      month: {
        title: 'Month',
        type: 'string',
      },
      date: {
        title: 'Payment Date',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  students: any[] = [];
  courses: [];

  records;

  filterParam: string;

  constructor(
    private router: Router,
    private dialogBoxService: NbDialogService,
    private reportService: ReportService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getAllStudentFeeRecords();
    this.getAllCourses();
  }

  initData(data) {
    this.records = data;
    this.source.load(this.records);
  }

  submitFilter(ref, data) {

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
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
  }

  addFilters(dialog: TemplateRef<any>) {
    this.open(dialog);
  }

  navigate(event): void {
    let studentId = event.data.id;
    this.router.navigateByUrl(`/pages/student/view/${studentId}`);
  }

  getAllStudentFeeRecords() {
    this.reportService.getAllStudentFeeRecords().subscribe({
      next: (response) => {
        this.initData(response.records);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  selectCourse(courseId) {
    this.reportService.getAllStudentFeeRecordsByCourse(courseId).subscribe({
      next: (response) => {
        this.initData(response.records);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
