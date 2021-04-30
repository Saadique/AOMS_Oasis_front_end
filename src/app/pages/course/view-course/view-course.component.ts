import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { SubjectService } from '../../../services/subject.service';
import { LectureService } from '../../../services/lecture.service';
import { pluck } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alert } from '../create-course/create-course.component';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';

@Component({
  selector: 'ngx-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  subjectEditForm: FormGroup

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private lectureService: LectureService,
    private localStorageService: LocalStorageService) { }

  courseMediumId;
  course;
  subjects: [];
  lectures: [];
  editFormDisplay: boolean = false;

  selectedEditSubject;

  subjectEditAlert = new Alert();

  loggedInUser;
  role;
  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
  }

  ngOnInit(): void {
    this.courseMediumId = this.route.snapshot.paramMap.get('id');
    this.loadAllSubjectsByCourse();
    this.loadAllLecturesByCourse();
    this.loadCourse();
    this.getUserRoleId();
  }

  initSubjectEditForm(subject) {
    this.subjectEditForm = new FormGroup({
      'name': new FormControl(subject.name, Validators.required),
      'type': new FormControl(subject.type, Validators.required),
      'description': new FormControl(subject.description, null)
    })
  }

  loadAllSubjectsByCourse() {
    this.subjectService.getAllSubjectsByCourseMediumALL(this.courseMediumId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.subjects = response;
      })
  }

  loadAllLecturesByCourse() {
    this.lectureService.getAllLecturesByCourseMedium(this.courseMediumId)
      .subscribe((response: any) => {
        console.log(response)
        this.lectures = response;
      })
  }

  loadCourse() {
    this.courseService.getOneCourseMedium(this.courseMediumId)
      .subscribe((response) => {
        this.course = response[0];
        console.log(this.course);
      })
  }

  editClick(subject) {
    this.initSubjectEditForm(subject);
    this.editFormDisplay = true;
    this.selectedEditSubject = subject;
  }

  setAlert(alertStatus, alertMessage): void {
    this.subjectEditAlert.status = alertStatus;
    this.subjectEditAlert.message = alertMessage;
    setTimeout(() => { this.subjectEditAlert = { "status": null, "message": null } }, 4500); // fade alert
  }


  updateSubject() {
    let data = {
      "name": this.subjectEditForm.value.name,
      "type": this.subjectEditForm.value.type,
      "description": this.subjectEditForm.value.description,
      "course_medium_id": this.courseMediumId
    }
    console.log(data);
    this.subjectService.updateSubject(data, this.selectedEditSubject.id).subscribe({
      next: (response) => {
        this.setAlert("success", "Subject Updated Successfully!")
        this.editFormDisplay = false;
        this.loadAllSubjectsByCourse();
      },
      error: (error) => {
        console.log(error);
        if (error.status == 400) {
          this.setAlert("Error", error.error.message)
        }
      }
    })
  }

  cancelEditForm() {
    this.editFormDisplay = false;
  }


  deleteClick(subject) {
    this.subjectService.changeDeleteStatus(subject.id, "deleted").subscribe({
      next: (response: any) => {
        this.loadAllSubjectsByCourse();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  activateClick(subject) {
    this.subjectService.changeDeleteStatus(subject.id, "active").subscribe({
      next: (response: any) => {
        this.loadAllSubjectsByCourse();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}
