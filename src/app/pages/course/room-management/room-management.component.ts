import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'app/authentication/services/local-storage/local-storage.service';
import { RoomService } from '../../../services/room.service';
import { Alert } from '../create-course/create-course.component';

@Component({
  selector: 'ngx-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent implements OnInit {

  roomCreationForm: FormGroup;
  roomUpdationForm: FormGroup;

  constructor(
    private roomService: RoomService,
    private localStorageService: LocalStorageService
  ) { }

  createCourseAlert = new Alert();
  editFormDisplay: boolean = false;
  rooms;

  loggedInUser;
  role;
  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
  }

  ngOnInit(): void {
    this.getUserRoleId();
    this.initForm();
    this.getAllRooms();
  }

  //Initialize create form
  private initForm() {
    this.roomCreationForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'no_of_seats': new FormControl(null, Validators.required),
      // 'is_ac_available': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required)
    });
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.createCourseAlert.status = alertStatus;
    this.createCourseAlert.message = alertMessage;
    setTimeout(() => { this.createCourseAlert = { "status": null, "message": null } }, 4500); // fade alert
  }


  createNewRoom() {
    if (this.roomCreationForm.valid) {
      let data = {
        "name": this.roomCreationForm.value.name,
        "no_of_seats": this.roomCreationForm.value.no_of_seats,
        // "is_ac_available": this.roomCreationForm.value.student_fee,
        "description": this.roomCreationForm.value.description,
        "status": this.roomCreationForm.value.status,
      }
      this.roomService.createRoom(data).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.setAlert('success', 'Payment Scheme Created Successfully');
            this.roomCreationForm.reset();
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
    } else {
      this.setAlert('warning', 'Please fill all required fields');
    }
  }

  getAllRooms() {
    this.roomService.getAllRooms().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.rooms = response;
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  editRoom;

  editClick(room) {
    this.editFormDisplay = true;
    this.editRoom = room;
    this.roomUpdationForm = new FormGroup({
      'name': new FormControl(room.name, Validators.required),
      'no_of_seats': new FormControl(room.no_of_seats, Validators.required),
      // 'is_ac_available': new FormControl(room.name, Validators.required),
      'description': new FormControl(room.description, Validators.required),
      'status': new FormControl(room.status, Validators.required)
    });
  }

  updateRoom() {
    if (this.roomUpdationForm.valid) {
      let roomId = this.editRoom.id;
      console.log(roomId);
      let data = {
        "name": this.roomUpdationForm.value.name,
        "no_of_seats": this.roomUpdationForm.value.no_of_seats,
        // "is_ac_available": this.roomUpdationForm.value.student_fee,
        "description": this.roomUpdationForm.value.description,
        "status": this.roomUpdationForm.value.status,
      }
      this.roomService.updateRoom(data, roomId).subscribe(
        {
          next: (response) => {
            console.log(roomId);
            console.log(response);
            this.setAlert('success', 'Room Information Updated Successfully');
            this.roomCreationForm.reset();
            this.getAllRooms();
            this.editFormDisplay = false;
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
    } else {
      this.setAlert('warning', 'Please fill all required fields');
    }
  }

  cancelEditForm() {
    this.editFormDisplay = false;
  }

}
