import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/authentication/services/local-storage/local-storage.service';
import { LectureService } from 'app/services/lecture.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'ngx-my-student-attendances',
  templateUrl: './my-student-attendances.component.html',
  styleUrls: ['./my-student-attendances.component.scss']
})
export class MyStudentAttendancesComponent implements OnInit {


  teacher;
  lectures;
  studentAttendances: [] = [];
  selectedLectureId;
  selectedDate;

  constructor(
    private lectureService: LectureService,
    private localStorageService: LocalStorageService,
    private teacherService: TeacherService
  ) {

  }

  ngOnInit(): void {
    this.initTeacher();
    this.getLecturesOfTeacher();
  }

  initTeacher() {
    this.teacher = this.localStorageService.getData().teacher;
  }

  getLecturesOfTeacher() {
    this.lectureService.getAllLecturesByTeacher(this.teacher.id).subscribe({
      next: (response) => {
        this.lectures = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getStudentAttendancesOfLectures(lectureId, date) {
    this.teacherService.getStudentAttendancesByLecture(lectureId, date).subscribe({
      next: (response) => {
        this.studentAttendances = response;
        console.log(this.studentAttendances);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  selectLecture(lectureId) {
    this.selectedLectureId = lectureId;
  }

  selectDate(date) {
    this.selectedDate = date;
  }

  seeStudentsAttendances() {
    if (this.selectedLectureId != null && this.selectedDate != null) {
      this.getStudentAttendancesOfLectures(this.selectedLectureId, this.selectedDate);
    }
  }



}
