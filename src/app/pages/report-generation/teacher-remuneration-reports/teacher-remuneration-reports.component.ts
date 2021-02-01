import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-teacher-remuneration-reports',
  templateUrl: './teacher-remuneration-reports.component.html',
  styleUrls: ['./teacher-remuneration-reports.component.scss']
})
export class TeacherRemunerationReportsComponent implements OnInit {

  data = [
    {
      staff_no: 'ST12',
      name: 'Keerthi Kaariyavasam',
      remuneration_no: 'R109',
      amount: 45500,
      month: 'December',
      date: '2021-01-04',
      lecture_name: 'GRD-13-Chemistry-E-P',
      no_of_students: 65
    },
    {
      staff_no: 'ST15',
      name: 'Naiomi Ekanaayaka',
      remuneration_no: 'R113',
      amount: 30800,
      month: 'December',
      date: '2021-01-04',
      lecture_name: 'GRD-13-ACCOUNTING-E-P',
      no_of_students: 44
    },
    {
      staff_no: 'ST15',
      name: 'Naiomi Ekanaayaka',
      remuneration_no: 'R114',
      amount: 16800,
      month: 'December',
      date: '2021-01-04',
      lecture_name: 'GRD-13-BS-E-P',
      no_of_students: 24
    },
    {
      staff_no: 'ST16',
      name: 'Muzain Mubarak',
      remuneration_no: 'R121',
      amount: 37800,
      month: 'December',
      date: '2021-01-04',
      lecture_name: 'GRD-13-ICT-E-P',
      no_of_students: 54
    },
  ];

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
      staff_no: {
        title: 'Staff No.',
        type: 'string',
      },
      name: {
        title: 'Teacher Name',
        type: 'string',
      },
      remuneration_no: {
        title: 'Remuneration No.',
        type: 'string',
      },
      amount: {
        title: 'Remuneration Amount',
        type: 'number',
      },
      month: {
        title: 'Payment Month',
        type: 'string',
      },
      date: {
        title: 'Payed Date',
        type: 'string',
      },
      lecture_name: {
        title: 'Lecture Name',
        type: 'string',
      },
      no_of_students: {
        title: 'No. of Students',
        type: 'string',
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();
  students: any[] = [];
  courses: [];
  courseMediums: [];

  filterParam: string;

  constructor(
    private router: Router,
    private dialogBoxService: NbDialogService
  ) {

  }

  ngOnInit(): void {
    this.source.load(this.data);
  }

  submitFilter(ref, data) {

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

}
