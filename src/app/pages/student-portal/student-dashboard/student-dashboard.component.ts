import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/authentication/services/local-storage/local-storage.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'ngx-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  student;
  notifications = [];

  constructor(private localStorageService: LocalStorageService,
    private studentService: StudentService) { }


  ngOnInit(): void {
    this.getStudent();
    this.getUptoDateNotifications();
  }

  getStudent() {
    let userData = this.localStorageService.getData();
    this.student = userData.student;
    console.log(this.student);
  }

  getUptoDateNotifications() {
    this.studentService.getStudentUptoDateNotifications(this.student.id).subscribe({
      next: (response) => {
        this.notifications = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
