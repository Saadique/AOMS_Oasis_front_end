import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { pluck } from 'rxjs/operators';
import { CourseService } from '../../../services/course.service';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';

@Component({
  selector: 'ngx-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
})
export class EditCoursesComponent implements OnInit {

  allCourses;
  courseMediums: [] = [];


  editCourseForm: FormGroup;

  constructor(
    private courseService: CourseService,
    private dialogBoxService: NbDialogService,
    private localStorageService: LocalStorageService) { }

  loggedInUser;
  role;
  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
  }

  ngOnInit(): void {
    this.getAllCourses();
    this.getUserRoleId();
  }


  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
  }

  //Initialize create form
  private initForm() {
    this.editCourseForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'coordinator': new FormControl(null, Validators.required),
      'course_type': new FormControl(null, Validators.required),
      'formMediums': new FormControl(null)
    });
  }

  getAllCourses() {
    this.courseService.getAllCoursesWithMediums()
      .subscribe((response) => {
        this.allCourses = response;
        console.log(this.allCourses);
      })
  }

  superCourseSelection(courseId) {
    this.courseService.getCoursesWithMediums(courseId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.courseMediums = response;
        console.log(this.courseMediums);
      })
  }

  editClickCourse(course, modal) {
    this.open(modal);
  }

  deleteClickCourseMedium(courseMedium) {

  }
  editCourse(dialog) {

  }

}
