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
  lecturesOfStudent;

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
    this.getLecturesOfStudent()
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

  getLecturesOfStudent() {
    this.studentService.getAllLecturesOfStudent(this.student.id).subscribe({
      next: (response) => {
        this.lecturesOfStudent = response;
        this.addLink();
        console.log(this.lecturesOfStudent);
      },
      error: (err) => {

      }
    })
  }

  decideClass() {
    if (this.getUptoDateNotifications.length != 0) {
      return "col-sm-4";
    }
    return "col-sm-6";
  }

  addLink() {
    for (let i = 0; i < this.lecturesOfStudent.length; i++) {
      this.lecturesOfStudent[i]["link"] = `/pages/student-portal/my_class/${this.lecturesOfStudent[i].id}`;
    }
  }

}

