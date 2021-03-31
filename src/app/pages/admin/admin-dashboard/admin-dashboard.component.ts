import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  studentOpLink;
  userMgtLink;
  constructor() { }

  ngOnInit(): void {
    this.studentOpLink = "/pages/student/view";
    this.userMgtLink = "/pages/user-management/user-roles";
  }

}
