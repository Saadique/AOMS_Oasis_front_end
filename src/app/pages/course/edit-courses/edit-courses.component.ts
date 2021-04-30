import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { pluck } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';
import { Alert } from '../create-course/create-course.component';

@Component({
  selector: 'ngx-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
})
export class EditCoursesComponent implements OnInit {

  allCourses: [] = [];
  courseMediums: [] = [];
  availableMediums;

  editCourseForm: FormGroup;

  selectedEditCourse;

  editCourseAlert = new Alert();

  constructor(
    private courseService: CourseService,
    private dialogBoxService: NbDialogService,
    private localStorageService: LocalStorageService) { }

  loggedInUser;
  role;
  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
    console.log(this.role);
  }

  ngOnInit(): void {
    this.getAllCourses();
    this.getUserRoleId();
    this.loadMediums();
  }


  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
  }

  //Initialize create form
  private initEditForm() {
    this.editCourseForm = new FormGroup({
      'name': new FormControl(this.selectedEditCourse.name),
      'medium': new FormControl(null, Validators.required)
    });
  }

  getAllCourses() {
    this.courseService.getAllCoursesWithMediums()
      .subscribe((response: any) => {
        this.allCourses = response;
        console.log(this.allCourses);
      })
  }

  selectedCourseId;
  superCourseSelection(courseId) {
    this.selectedCourseId = courseId;
    this.courseService.getCoursesWithMediums(courseId)
      .pipe(
        pluck('data')
      ).subscribe((response: any) => {
        this.courseMediums = response;
        console.log(this.courseMediums);
      })
  }

  editClickCourse(course, modal) {
    this.selectedEditCourse = course;
    this.initEditForm();
    this.open(modal);
  }

  selectedDeleteCourse;
  deleteClickCourse(course, confirmationModal) {
    this.selectedDeleteCourse = course;
    this.open(confirmationModal);
  }

  onDeleteConfirmationCourse(modal) {
    this.deleteCourse();
    modal.close();
  }

  deleteCourse() {
    this.courseService.changeDeleteStatusCourse(this.selectedDeleteCourse.id, "deleted").subscribe({
      next: (next) => {
        this.getAllCourses();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  activateCourse(course) {
    this.courseService.changeDeleteStatusCourse(course.id, "active").subscribe({
      next: (next) => {
        this.getAllCourses();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editCourse(modal) {
    let data = {
      "name": this.editCourseForm.value.name,
      "medium": this.editCourseForm.value.medium
    }
    if (this.editCourseForm.valid) {
      this.courseService.updateCourse(this.selectedEditCourse.id, data).subscribe({
        next: (response) => {
          console.log(response);
          this.getAllCourses();
          modal.close();
        },
        error: (err) => {
          console.log(err);
          if (err.status == 400) {
            this.setAlert('error', err.error.message);
          }
        }
      })
    }

  }

  deleteCourseMedium(courseMedium) {
    this.courseService.changeDeleteStatusCourseMedium(courseMedium.id, "deleted").subscribe({
      next: (next) => {
        this.superCourseSelection(this.selectedCourseId);
        this.getAllCourses();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  activateCourseMedium(courseMedium) {
    this.courseService.changeDeleteStatusCourseMedium(courseMedium.id, "active").subscribe({
      next: (response) => {
        this.superCourseSelection(this.selectedCourseId);
        this.getAllCourses();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.editCourseAlert.status = alertStatus;
    this.editCourseAlert.message = alertMessage;
    setTimeout(() => { this.editCourseAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  loadMediums() {
    this.courseService.getAllMediums()
      .pipe(
        pluck('data')
      )
      .subscribe((response) => {
        this.availableMediums = response;
      })
  }

}
