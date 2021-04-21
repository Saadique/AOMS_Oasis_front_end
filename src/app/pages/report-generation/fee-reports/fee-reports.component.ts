import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CourseService } from 'app/services/course.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ReportService } from '../../../services/report.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'
import { Alert } from '../../course/create-course/create-course.component';
import { TeacherService } from '../../../services/teacher.service';
import { LectureService } from '../../../services/lecture.service';
import { filter } from 'rxjs/operators';

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

  filterOption: string;
  timeSpan: string;

  studentFeeReportAlert = new Alert();
  teachers;
  lectures;

  constructor(
    private router: Router,
    private dialogBoxService: NbDialogService,
    private reportService: ReportService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private lectureService: LectureService
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.getAllCourses();
    this.getAllTeachers();
    this.getAllLectures();
  }

  initData(data) {
    this.records = data;
    this.source.load(this.records);
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.studentFeeReportAlert.status = alertStatus;
    this.studentFeeReportAlert.message = alertMessage;
    setTimeout(() => { this.studentFeeReportAlert = { "status": null, "message": null } }, 4500); // fade alert
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
      next: (response) => {
        this.lectures = response.data;
        console.log(this.lectures);
      },
      error: (error) => {

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

  selectFilterOption(filterOption) {
    console.log(this.filter);
    this.filterOption = filterOption;
  }

  selectTimeSpan(timeSpan) {
    this.timeSpan = timeSpan;
    console.log(this.filter);
  }

  loadInitialData() {
    this.reportService.getAllStudentFeeRecords().subscribe({
      next: (response) => {
        console.log(response);
        this.initData(response.records);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  selectCourse(courseId) {

  }


  makePDF() {
    let recordsArray: any[] = [];
    for (let i = 0; i < this.records.length; i++) {
      let dataArray: any[] = [];
      const record = this.records[i];
      dataArray.push(record.registration_no);
      dataArray.push(record.student_name);
      dataArray.push(record.mode);
      dataArray.push(record.payment_name);
      dataArray.push(record.amount);
      dataArray.push(record.month);
      dataArray.push(record.date);
      recordsArray.push(dataArray);
    }

    const pdf = new jsPDF();
    autoTable(pdf, {
      head: [['STD Reg No.', 'STD Name', 'Payment Mode', 'Payment Name', 'Fee Amount', 'Month', 'Payment Date']],
      body: recordsArray,
    })
    pdf.save();
  }

  submitFilter(modal, data) {
    if (this.filter.filterOption != '') {
      switch (this.filter.filterOption) {
        case 'all':
          if (this.filter.reportTimeSpan != '') {
            this.getAllStudentFeeRecords(modal);
          } else {
            this.setAlert('error', 'Please Select Report Time Span');
          }
          break;
        case 'course':
          if (this.filter.courseId != '') {
            if (this.filter.reportTimeSpan != '') {
              this.getRecordsByCourse(modal);
            } else {
              this.setAlert('error', 'Please Select Report Time Span');
            }
          } else {
            this.setAlert('error', 'Please Select A Course');
          }
          break;
        case 'lecture':
          if (this.filter.lectureId != '') {
            if (this.filter.reportTimeSpan != '') {
              this.getAllStudentFeeRecords(modal);
            } else {
              this.setAlert('error', 'Please Select Report Time Span');
            }
          } else {
            this.setAlert('error', 'Please Select A Lecture');
          }
          break;
        case 'teacher':
          if (this.filter.teacherId != '') {
            if (this.filter.reportTimeSpan != '') {
              this.getAllStudentFeeRecords(modal);
            } else {
              this.setAlert('error', 'Please Select Report Time Span');
            }
          } else {
            this.setAlert('error', 'Please Select A Teacher');
          }
          break;
        case 'level':
          if (this.filter.level != '') {
            if (this.filter.reportTimeSpan != '') {
              this.getAllStudentFeeRecords(modal);
            } else {
              this.setAlert('error', 'Please Select Report Time Span');
            }
          } else {
            this.setAlert('error', 'Please Select A Level');
          }
      }
    } else {
      this.setAlert('error', 'Please Select A Filter Option');
    }
  }

  getAllStudentFeeRecords(modal) {
    switch (this.filter.reportTimeSpan) {
      case 'all_time':
        this.reportService.getAllStudentFeeRecords().subscribe({
          next: (response) => {
            this.initData(response.records);
            modal.close();
          },
          error: (error) => {
            console.log(error);
          }
        })
        break;
      case 'by_month':
        if (this.filter.by_month.month != '' && this.filter.by_month.year != '') {
          this.reportService.getAllStudentFeeRecordsByMonth(this.filter.by_month.year, this.filter.by_month.month).subscribe({
            next: (response) => {
              this.initData(response.records);
              modal.close();
            },
            error: (error) => {
              console.log(error);
            }
          })
          break;
        } else {
          this.setAlert('error', 'Please Select An Year And A Month');
        }
        break;
      case 'by_range':
        if (this.filter.by_range.from_date != '' && this.filter.by_range.to_date != '') {
          this.reportService.getAllStudentFeeRecordsByDate(this.filter.by_range.from_date, this.filter.by_range.to_date).subscribe({
            next: (response) => {
              console.log(response);
              this.initData(response.records);
              modal.close();
            },
            error: (error) => {
              console.log(error);
            }
          })
          break;
        } else {
          this.setAlert('error', 'Please Select A Date Frame');
        }
    }
  }


  getRecordsByCourse(modal) {
    switch (this.filter.reportTimeSpan) {
      case 'all_time':
        this.reportService.getAllStudentFeeRecordsByCourse(this.filter.courseId).subscribe({
          next: (response) => {
            this.initData(response.records);
            modal.close();
          },
          error: (error) => {
            console.log(error);
          }
        })
        break;
      case 'by_month':
        if (this.filter.by_month.month != '' && this.filter.by_month.year != '') {
          this.reportService.getAllStudentFeeRecordForCourseByMonth(this.filter.courseId, this.filter.by_month.year, this.filter.by_month.month).subscribe({
            next: (response) => {
              this.initData(response.records);
              modal.close();
            },
            error: (error) => {
              console.log(error);
            }
          })
          break;
        } else {
          this.setAlert('error', 'Please Select An Year And A Month');
        }
        break;
      case 'by_range':
        if (this.filter.by_range.from_date != '' && this.filter.by_range.to_date != '') {
          if (this.filter.by_month.month != '' && this.filter.by_month.year != '') {
            this.reportService.getAllStudentFeeRecordForCourseByMonth(this.filter.courseId, this.filter.by_range.from_date, this.filter.by_range.to_date).subscribe({
              next: (response) => {
                this.initData(response.records);
                modal.close();
              },
              error: (error) => {
                console.log(error);
              }
            })
            break;
          } else {
            this.setAlert('error', 'Please Select A Date Frame');
          }
        }
    }
  }


  getRecordsByTeacher(modal) {
    switch (this.filter.reportTimeSpan) {
      case 'all_time':
        this.reportService.getAllStudentFeeRecordByTeacher(this.filter.courseId).subscribe({
          next: (response) => {
            this.initData(response.records);
            modal.close();
          },
          error: (error) => {
            console.log(error);
          }
        })
        break;
      case 'by_month':
        if (this.filter.by_month.month != '' && this.filter.by_month.year != '') {
          this.reportService.getAllStudentFeeRecordForTeacherByMonth(this.filter.teacherId, this.filter.by_month.year, this.filter.by_month.month).subscribe({
            next: (response) => {
              this.initData(response.records);
              modal.close();
            },
            error: (error) => {
              console.log(error);
            }
          })
          break;
        } else {
          this.setAlert('error', 'Please Select An Year And A Month');
        }
        break;
      case 'by_range':
        if (this.filter.by_range.from_date != '' && this.filter.by_range.to_date != '') {
          if (this.filter.by_month.month != '' && this.filter.by_month.year != '') {
            this.reportService.getAllStudentFeeRecordForTeacherByMonth(this.filter.teacherId, this.filter.by_range.from_date, this.filter.by_range.to_date).subscribe({
              next: (response) => {
                this.initData(response.records);
                modal.close();
              },
              error: (error) => {
                console.log(error);
              }
            })
            break;
          } else {
            this.setAlert('error', 'Please Select A Date Frame');
          }
        }
    }
  }

  getRecordsByLecture(modal) {
    switch (this.filter.reportTimeSpan) {
      case 'all_time':
        this.reportService.getAllStudentFeeRecordByLecture(this.filter.courseId).subscribe({
          next: (response) => {
            this.initData(response.records);
            modal.close();
          },
          error: (error) => {
            console.log(error);
          }
        })
        break;
      case 'by_month':
        if (this.filter.by_month.month != '' && this.filter.by_month.year != '') {
          this.reportService.getAllStudentFeeRecordForLectureByMonth(this.filter.lectureId, this.filter.by_month.year, this.filter.by_month.month).subscribe({
            next: (response) => {
              this.initData(response.records);
              modal.close();
            },
            error: (error) => {
              console.log(error);
            }
          })
        } else {
          this.setAlert('error', 'Please Select An Year And A Month');
        }
        break;
      case 'by_range':
        if (this.filter.by_range.from_date != '' && this.filter.by_range.to_date != '') {
          this.reportService.getAllStudentFeeRecordForLectureByMonth(this.filter.lectureId, this.filter.by_range.from_date, this.filter.by_range.to_date).subscribe({
            next: (response) => {
              this.initData(response.records);
              modal.close();
            },
            error: (error) => {
              console.log(error);
            }
          })
        } else {
          this.setAlert('error', 'Please Select A Date Frame');
        }
    }

  }





}
