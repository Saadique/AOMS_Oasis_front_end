import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Alert } from '../../course/create-course/create-course.component';
import { CourseService } from '../../../services/course.service';
import { LectureService } from '../../../services/lecture.service';
import { TeacherService } from '../../../services/teacher.service';
import { ReportService } from '../../../services/report.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'ngx-teacher-remuneration-reports',
  templateUrl: './teacher-remuneration-reports.component.html',
  styleUrls: ['./teacher-remuneration-reports.component.scss']
})
export class TeacherRemunerationReportsComponent implements OnInit {



  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      teacher_name: {
        title: 'Teacher Name',
        type: 'string',
      },
      lecture_name: {
        title: 'Lecture Name',
        type: 'string',
      },
      course_name: {
        title: 'Course Name',
        type: 'string',
      },
      total_remun: {
        title: 'Remuneration Amount',
        type: 'number',
      },
      no_of_student_payments: {
        title: 'Total No. Of Student Payments',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  students: any[] = [];
  courses: [];
  teachers;
  lectures;

  filterParam: string;

  remunAlert = new Alert();

  records;
  totalAmount;

  filterOption;

  filter = {
    'filterOption': '',
    'courseId': '',
    'lectureId': '',
    'teacherId': '',
    'level': '',
    'reportTimeSpan': '',
    'by_month': {
      'year': '',
      'month': '',
    },
    'by_range': {
      'from_date': '',
      'to_date': ''
    }
  }

  constructor(
    private dialogBoxService: NbDialogService,
    private courseService: CourseService,
    private lectureService: LectureService,
    private teacherService: TeacherService,
    private reportService: ReportService
  ) {

  }

  ngOnInit(): void {
    this.loadInitialData();
    this.getAllCourses();
    this.getAllTeachers();
    this.getAllLectures();
  }

  initData(data) {
    console.log(data);
    this.records = data;
    this.source.load(this.records);
  }

  initTotalAmount(totalAmount) {
    this.totalAmount = totalAmount;
  }

  loadInitialData() {
    this.reportService.getAllRemunerationsPaidForTeachers().subscribe({
      next: (response: any) => {
        console.log(response);
        this.initData(response.records);
        this.initTotalAmount(response.total_amount);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  getAllCourses() {
    this.courseService.getAllCourseMediums().subscribe({
      next: (response: any) => {
        this.courses = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe({
      next: (response) => {
        this.teachers = response;
        console.log(this.teachers);
      },
      error: (error) => {

      }
    })
  }

  getAllLectures() {
    this.lectureService.getAllLectures().subscribe({
      next: (response: any) => {
        this.lectures = response.data;
        console.log(this.lectures);
      },
      error: (error) => {

      }
    })
  }

  allSearch(value) {
    if (value != '') {
      var newList = this.records.filter(element => {
        for (var property in element) {
          if (element.hasOwnProperty(property)) {
            if (element[property] == value) {
              return true;
            }
          }
        }
      });
      this.initData(newList);
    } else {
      this.loadInitialData();
    }
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.remunAlert.status = alertStatus;
    this.remunAlert.message = alertMessage;
    setTimeout(() => { this.remunAlert = { "status": null, "message": null } }, 4500); // fade alert
  }


  selectFilterOption(filterOption) {
    console.log(this.filter);
    this.filterOption = filterOption;
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
  }

  addFilters(dialog: TemplateRef<any>) {
    this.open(dialog);
  }

  makePDF() {
    let recordsArray: any[] = [];
    for (let i = 0; i < this.records.length; i++) {
      let dataArray: any[] = [];
      const record = this.records[i];
      dataArray.push(record.teacher_name);
      dataArray.push(record.lecture_name);
      dataArray.push(record.course_name);
      dataArray.push(record.total_remun);
      dataArray.push(record.no_of_student_payments);
      recordsArray.push(dataArray);
    }

    const pdf = new jsPDF();
    autoTable(pdf, {
      head: [['Teacher Name', 'Lecture Name', 'Course Name', 'Remuneration Amount', 'Total No. Of Student Payments']],
      body: recordsArray,
    })


    autoTable(pdf, {
      head: [['Total Amount']],
      body: [[this.totalAmount]],
      styles: { fillColor: "#43a047" },
    })

    pdf.save();
  }

  printReport() {
    let recordsArray: any[] = [];
    for (let i = 0; i < this.records.length; i++) {
      let dataArray: any[] = [];
      const record = this.records[i];
      dataArray.push(record.teacher_name);
      dataArray.push(record.lecture_name);
      dataArray.push(record.course_name);
      dataArray.push(record.total_remun);
      dataArray.push(record.no_of_student_payments);
      recordsArray.push(dataArray);
    }

    const pdf = new jsPDF();
    autoTable(pdf, {
      head: [['Teacher Name', 'Lecture Name', 'Course Name', 'Remuneration Amount', 'Total No. Of Student Payments']],
      body: recordsArray
    })

    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
  }

  submitFilter(modal) {
    if (this.filter.filterOption != '') {
      switch (this.filter.filterOption) {
        case 'all':
          // if (this.filter.reportTimeSpan != '') {
          this.getAllRemunerationsPaidForTeachers(modal);
          // } else {
          //   this.setAlert('error', 'Please Select Report Time Span');
          // }
          break;
        case 'course':
          if (this.filter.courseId != '') {
            // if (this.filter.reportTimeSpan != '') {
            this.getAllRemunerationsPaidForTeachersByCourse(modal);
            // } else {
            //   this.setAlert('error', 'Please Select Report Time Span');
            // }
          } else {
            this.setAlert('error', 'Please Select A Course');
          }
          break;
        case 'lecture':
          if (this.filter.lectureId != '') {
            // if (this.filter.reportTimeSpan != '') {
            console.log(this.filter.lectureId);
            this.getAllRemunerationsPaidForTeachersByLecture(modal);
            // } else {
            //   this.setAlert('error', 'Please Select Report Time Span');
            // }
          } else {
            this.setAlert('error', 'Please Select A Lecture');
          }
          break;
        case 'teacher':
          if (this.filter.teacherId != '') {
            // if (this.filter.reportTimeSpan != '') {
            this.getAllRemunerationsPaidForTeachersByTeacher(modal);
            // } else {
            //   this.setAlert('error', 'Please Select Report Time Span');
            // }
          } else {
            this.setAlert('error', 'Please Select A Teacher');
          }
          break;
        // case 'level':
        //   if (this.filter.level != '') {
        //     if (this.filter.reportTimeSpan != '') {
        //       this.getAllStudentFeeRecords(modal);
        //     } else {
        //       this.setAlert('error', 'Please Select Report Time Span');
        //     }
        //   } else {
        //     this.setAlert('error', 'Please Select A Level');
        //   }
      }
    } else {
      this.setAlert('error', 'Please Select A Filter Option');
    }
  }

  getAllRemunerationsPaidForTeachers(modal) {
    this.reportService.getAllRemunerationsPaidForTeachers().subscribe({
      next: (response: any) => {
        this.initData(response.records);
        this.initTotalAmount(response.total_amount);
        modal.close();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllRemunerationsPaidForTeachersByTeacher(modal) {
    this.reportService.getAllRemunerationsPaidForTeachersByTeacher(this.filter.teacherId).subscribe({
      next: (response: any) => {
        this.initData(response.records);
        this.initTotalAmount(response.total_amount);
        modal.close();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllRemunerationsPaidForTeachersByLecture(modal) {
    this.reportService.getAllRemunerationsPaidForTeachersByLecture(this.filter.lectureId).subscribe({
      next: (response: any) => {
        this.initData(response.records);
        this.initTotalAmount(response.total_amount);
        modal.close();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllRemunerationsPaidForTeachersByCourse(modal) {
    this.reportService.getAllRemunerationsPaidForTeachersByCourse(this.filter.courseId).subscribe({
      next: (response: any) => {
        this.initData(response.records);
        this.initTotalAmount(response.total_amount);
        modal.close();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



}
