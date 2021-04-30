import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'app/authentication/services/local-storage/local-storage.service';
import { Alert } from 'app/pages/course/create-course/create-course.component';
import { LectureService } from 'app/services/lecture.service';
import { ScheduleService } from 'app/services/schedule.service';

@Component({
  selector: 'ngx-my-schedules',
  templateUrl: './my-schedules.component.html',
  styleUrls: ['./my-schedules.component.scss']
})
export class MySchedulesComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
    private lectureService: LectureService,
    private localStorageService: LocalStorageService) { }

  scheduleForm: FormGroup;

  viewScheduleAlert = new Alert();
  deleteAlertMessage = new Alert();

  schedule = {
    'id': null,
    'date': null,
    'start_time': null,
    'end_time': null,
    'room_id': null,
    'lecture': null
  }

  courses = [];
  lectures = [];
  schedules = [];
  touchedDateBox = false;
  deleteScheduleId: number;
  student;

  isDateSelected: boolean = false;
  isCreateForm: boolean = false;
  isEditForm: boolean = false;
  isDeleteClick: boolean = false;

  displayScheduleForm: boolean = false;


  foundShedule = false;
  setToTrue() {
    this.foundShedule = true;
  }
  setToFalse() {
    this.foundShedule = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.isFormValid();
    this.initStudent();
  }

  initStudent() {
    this.student = this.localStorageService.getData().student;
  }

  dateSelectionForm: FormGroup;

  //Initialize date selection field
  private initForm() {
    this.dateSelectionForm = new FormGroup({
      'date': new FormControl(null, Validators.required)
    });
  }

  isFormValid() {
    if (this.dateSelectionForm.valid) {
      this.isDateSelected = true;
      console.log("valid");
    } else {
      this.isDateSelected = false;
    }
  }

  // @ViewChild('scheduleForm') public scheduleForm2: HTMLElement;
  // onScroll(el: string) {
  //   const le: HTMLElement = document.getElementById('scheduleForm');
  //   this.scheduleForm2.scrollIntoView({ behavior: 'smooth' });
  //   console.log("Scrll");
  // }

  getSchedules() {
    this.isFormValid();
    this.touchedDateBox = true;
    this.displayScheduleForm = false;
    if (this.dateSelectionForm.valid) {
      this.getAllSchedulesByDate(this.dateSelectionForm.value.date)
    }
  }

  getHour(time) {
    var date = new Date("May 1,2019 " + time);
    return date.getHours();
  }

  getAllSchedulesByDate(date) {
    this.scheduleService.getStudentSchedules(date, this.student.id).subscribe(
      {
        next: (response: any) => {
          this.schedules = response;
          console.log(response)
        },
        error: (err) => {
          if (err.error.code == 400) {
            console.log(err.error);
          }
        }
      }
    )
  }


  requestChange(schedule) {

  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.viewScheduleAlert.status = alertStatus;
    this.viewScheduleAlert.message = alertMessage;
    setTimeout(() => { this.viewScheduleAlert = { "status": null, "message": null } }, 5500); // fade alert
  }

  setDeleteAlert(alertStatus, alertMessage): void {
    this.deleteAlertMessage.status = alertStatus;
    this.deleteAlertMessage.message = alertMessage;
    setTimeout(() => { this.deleteAlertMessage = { "status": null, "message": null } }, 5500); // fade alert
  }

  courseSelection(courseMediumId) {
    this.lectureService.getAllLecturesByCourseMedium(courseMediumId)
      .subscribe((response: any) => {
        console.log(response);
        this.lectures = response;
      })
  }

}
