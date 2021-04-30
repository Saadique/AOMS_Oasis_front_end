import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ScheduleService } from 'app/services/schedule.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { LectureService } from '../../../services/lecture.service';
import { pluck } from 'rxjs/operators';
import { Alert } from '../create-course/create-course.component';
import { NbDialogService } from '@nebular/theme';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'ngx-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
    private roomService: RoomService,
    private fb: FormBuilder,
    private courseService: CourseService,
    private lectureService: LectureService,
    private dialogBoxService: NbDialogService) { }

  scheduleForm: FormGroup;

  rooms;

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

  initSchedule(schedule) {
    this.schedule.id = schedule.id;
    this.schedule.date = schedule.date;
    this.schedule.start_time = schedule.start_time;
    this.schedule.end_time = schedule.end_time;
    this.schedule.room_id = schedule.room_id;
    this.schedule.lecture = schedule.lecture;
  }

  courses = [];
  lectures = [];
  schedules = [];
  touchedDateBox = false;
  deleteScheduleId: number;

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
    this.getAllRooms();
    this.initForm();
    this.isFormValid();
    this.getAllCourseMediums();
    this.initScheduleCreateForm();
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

  initScheduleCreateForm() {
    this.scheduleForm = this.fb.group({
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      room_id: ['', Validators.required],
      date: [this.dateSelectionForm.value.date, Validators.required],
      course_id: ['', Validators.required],
      lecture_id: ['', Validators.required]
    });
  }

  initScheduleEditForm(schedule) {
    console.log(schedule);
    this.scheduleForm = this.fb.group({
      start_time: [schedule.start_time.slice(0, -3), Validators.required],
      end_time: [schedule.end_time.slice(0, -3), Validators.required],
      date: [schedule.date, Validators.required],
      room_id: [schedule.room_id, Validators.required]
    });
  }


  todaysDate;
  getTodaysDate() {
    var today: any = new Date();
    var dd: any = today.getDate();
    var mm: any = today.getMonth() + 1; //January is 0!
    var yyyy: any = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    this.todaysDate = yyyy + '-' + mm + '-' + dd;
  }
  onCreateClick(modal) {
    this.getTodaysDate();
    if (this.todaysDate <= this.dateSelectionForm.value.date) {
      this.openForm(modal);
      this.displayScheduleForm = true;
      this.isCreateForm = true;
      this.isEditForm = false;
      this.initScheduleCreateForm();
    } else {
      this.setDeleteAlert('warning', 'Schedules Can Only Be Created In PRESENT/FUTURE DATES');
    }
  }

  openForm(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
  }

  // @ViewChild('scheduleForm') public scheduleForm2: HTMLElement;
  // onScroll(el: string) {
  //   const le: HTMLElement = document.getElementById('scheduleForm');
  //   this.scheduleForm2.scrollIntoView({ behavior: 'smooth' });
  //   console.log("Scrll");
  // }

  onEditClick(schedule, modal) {
    this.getTodaysDate();
    if (this.todaysDate <= schedule.date) {
      this.openForm(modal);
      this.isEditForm = true;
      this.isCreateForm = false;
      this.displayScheduleForm = true;
      this.initScheduleEditForm(schedule);
      this.initSchedule(schedule);
    } else {
      this.setDeleteAlert('warning', 'Cannot Edit Completed Schedules');
    }
  }

  onDeleteClick(schedule, dialog: TemplateRef<any>) {
    this.getTodaysDate();
    if (this.todaysDate <= schedule.date) {
      this.displayScheduleForm = false;
      console.log(schedule);
      this.isDeleteClick = true;
      this.open(dialog);
      this.deleteScheduleId = schedule.id;
    } else {
      this.setDeleteAlert('warning', 'Cannot Delete Completed Schedules');
    }
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog, { context: 'Are you sure you want to delete this schedule?' });
  }

  onDeleteConfirmation(ref, data) {
    console.log(this.deleteScheduleId);
    this.deleteSchedule();
    console.log(data);
    console.log(ref);
    ref.close();
  }

  deleteSchedule() {
    this.scheduleService.deleteDailySchedule(this.deleteScheduleId).subscribe(
      {
        next: (response: any) => {
          console.log(response.data);
          this.setDeleteAlert('success', `Schedule was deleted successfully`);
          this.getAllSchedulesByDate(this.dateSelectionForm.value.date);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  updateSchedule(modal) {
    console.log(this.schedule);
    if (this.scheduleForm.valid) {
      let data = {
        'date': this.scheduleForm.value.date,
        'start_time': this.scheduleForm.value.start_time + ":00",
        'end_time': this.scheduleForm.value.end_time + ":00",
        'room_id': this.scheduleForm.value.room_id,
        'lecture_id': this.schedule.lecture.id
      }
      console.log(data);
      this.scheduleService.updateDailySchedule(data, this.schedule.id).pipe(pluck('data')).subscribe(
        {
          next: (response) => {
            console.log(response);
            modal.close();
            this.scheduleForm.reset();
            this.setAlert('success', 'Updated Schedule');
            this.getAllSchedulesByDate(this.dateSelectionForm.value.date);
          },
          error: (err) => {
            // this.alreadyExists = true;
            // this.setAlert('Error', err.error.message);
            if (err.error.code == 400) {
              this.setAlert('Error', err.error.message);
            }
            console.log(err);
          }
        }
      )
    } else {
      this.setAlert('Error', 'Please Fill All Required Fileds');
    }
  }

  createNewOneTimeSchedule(modal) {
    if (this.scheduleForm.valid) {
      let data = {
        'day': 'Wednesday',
        'date': this.dateSelectionForm.value.date,
        'start_time': this.scheduleForm.value.start_time + ":00",
        'end_time': this.scheduleForm.value.end_time + ":00",
        'room_id': this.scheduleForm.value.room_id,
        'lecture_id': this.scheduleForm.value.lecture_id
      }
      console.log(data);
      this.scheduleService.createOneTimeSchedule(data).pipe(pluck('data')).subscribe(
        {
          next: (response) => {
            console.log(response);
            modal.close();
            this.scheduleForm.reset();
            this.setAlert('success', 'One time schedule created successfully');
            this.getAllSchedulesByDate(this.dateSelectionForm.value.date);
          },
          error: (err) => {
            console.log(err);
            if (err.error.code == 400) {
              this.setAlert('Error', err.error.message);
            }
          }
        }
      )
    } else {
      this.setAlert('Error', 'Please Fill All Required Fileds');
    }
  }

  getSchedules() {
    this.isFormValid();
    this.touchedDateBox = true;
    this.displayScheduleForm = false;
    if (this.dateSelectionForm.valid) {
      this.getAllSchedulesByDate(this.dateSelectionForm.value.date)
    }
  }

  getAllRooms() {
    this.roomService.getAllRooms().subscribe(
      {
        next: (response) => {
          this.rooms = response;
        },
        error: (err) => {
          console.log(err.error);
        }
      }
    )
  }

  getHour(time) {
    var date = new Date("May 1,2019 " + time);
    return date.getHours();
  }

  getAllSchedulesByDate(date) {
    this.scheduleService.getSchedulesByDate(date).subscribe(
      {
        next: (response: any) => {
          this.schedules = response;
          console.log(this.schedules);
        },
        error: (err) => {
          if (err.error.code == 400) {
            console.log(err.error);
          }
          console.log(err);
        }
      }
    )
  }

  getAllCourseMediums() {
    this.courseService.getAllCourseMediums().subscribe(
      {
        next: (response: any) => {
          this.courses = response.data;
          console.log(this.courses);
        },
        error: (err) => {
          if (err.error.code == 400) {
            console.log(err.error);
          }
        }
      }
    )
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

  displayCreateCourse() {
    this.displayScheduleForm = true;
  }

  hideCreateCourse() {
    this.displayScheduleForm = false;
  }

}
