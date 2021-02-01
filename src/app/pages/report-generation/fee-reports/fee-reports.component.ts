import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-fee-reports',
  templateUrl: './fee-reports.component.html',
  styleUrls: ['./fee-reports.component.scss']
})
export class FeeReportsComponent implements OnInit {
  data = [
    {
      registration_no: 'r2020110',
      name: 'R Gulaam',
      payment_number: 'P-N-20110-12',
      payment_mode: 'SCHEME',
      payment_amount: 3000,
      month: 'November',
      payment_date: '2020-11-20',
      teacher_rem_status: 'PAID'
    },
    {
      registration_no: 'r2020011',
      name: 'M Salaah',
      payment_number: 'P-N-20011-13',
      payment_mode: 'SCHEME',
      payment_amount: 3000,
      month: 'November',
      payment_date: '2020-11-20',
      teacher_rem_status: 'PAID'
    },
    {
      registration_no: 'r2020111',
      name: 'M Yasith',
      payment_number: 'P-J-20132-45',
      payment_mode: 'NORMAL',
      payment_amount: 1900,
      month: 'November',
      payment_date: '2020-11-20',
      teacher_rem_status: 'PAID'
    },
    {
      registration_no: 'r2020156',
      name: 'WS Shaan',
      payment_number: 'P-J-20156-55',
      payment_mode: 'NORMAL',
      payment_amount: 1900,
      month: 'December',
      payment_date: '2020-12-02',
      teacher_rem_status: 'PAID'
    },
    {
      registration_no: 'r2020090',
      name: 'MZM Sadiq',
      payment_number: 'P-J-20090-12',
      payment_mode: 'NORMAL',
      payment_amount: 1700,
      month: 'January',
      payment_date: '2020-01-27',
      teacher_rem_status: 'PAID'
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
      registration_no: {
        title: 'STD Reg No.',
        type: 'string',
      },
      name: {
        title: 'STD Name',
        type: 'string',
      },
      payment_number: {
        title: 'Payment No.',
        type: 'string',
      },
      payment_mode: {
        title: 'Payment Mode',
        type: 'number',
      },
      payment_amount: {
        title: 'Payment Amount',
        type: 'string',
      },
      month: {
        title: 'Payment Month',
        type: 'string',
      },
      payment_date: {
        title: 'Payment Date',
        type: 'string',
      },
      teacher_rem_status: {
        title: 'Teacher Remuneration Status',
        type: 'string'
      }
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
