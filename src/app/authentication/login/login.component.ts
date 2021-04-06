import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthService, NbAuthSocialLink, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LoginService } from '../../services/login.service';
import { LoginServiceService } from '../services/login/login-service.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { ADMIN_MENU_ITEMS, STUDENT_MENU_ITEMS, TEACHER_MENU_ITEMS } from '../../pages/pages-menu';
import { LectureService } from 'app/services/lecture.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  loginForm: FormGroup;

  studentLectures;
  classChildrenMenu = null;



  lecturesOfTeacher;
  classChildrenTeacherMenu = null;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private localStorageService: LocalStorageService,
    private lectureService: LectureService
  ) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  ngOnInit(): void {
    this.clearLogin();
  }

  clearLogin() {
    this.localStorageService.clearLogin();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    console.log(this.user);

    this.loginService.authenticate(this.user).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.localStorageService.setToken(response.token);
          switch (response.userRoleId) {
            case 1:
              // response.userViews = TEACHER_MENU_ITEMS;
              // this.localStorageService.setData(response);

              let tempTeacherViews = TEACHER_MENU_ITEMS;
              this.makeLectureMenuOfTeacher(response.teacher.id);
              setTimeout(() => {
                this.getAllTeacherViews(tempTeacherViews);
                response.userViews = tempTeacherViews;
                this.localStorageService.setData(response);
                return this.router.navigateByUrl('/pages/teacher-portal/dashboard');
              }, 1000);
              break;
            case 2:
              let tempUserViews = STUDENT_MENU_ITEMS;
              this.makeLectureMenuOfStudents(response.student.id);
              setTimeout(() => {
                this.getAllStudentViews(tempUserViews);
                response.userViews = tempUserViews;
                this.localStorageService.setData(response);
                return this.router.navigateByUrl('/pages/student-portal/dashboard');
              }, 1000);
              break;
            // response.userViews = STUDENT_MENU_ITEMS;
            // this.localStorageService.setData(response);

            case 3:
              response.userViews = ADMIN_MENU_ITEMS;
              this.localStorageService.setData(response);
              return this.router.navigateByUrl('/pages/admin/dashboard');
          }
        },
        error: (err) => {
          // if (err.error.code == 400) {
          //   // this.alreadyExists = true;
          //   // this.setAlert('Error', err.error.message);
          //   this.errors.push(err.error.message);
          // }
          // this.errors = err.error.message;
          // alert(err.error.message);
          console.log(err.error);
        }
      })

    // this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;

    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //   } else {
    //     this.errors = result.getErrors();
    //   }

    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.cd.detectChanges();
    // });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }


  makeLectureMenuOfStudents(studentId) {
    this.lectureService.getAllLectureByStudent(studentId).subscribe(
      {
        next: (response) => {
          // console.log(response);
          this.studentLectures = response;
          this.classChildrenMenu = this.makeMenu(this.studentLectures);
          // console.log(this.classChildrenMenu);
          // this.getAllViews(tempUserViews);
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  makeLectureMenuOfTeacher(teacherId) {
    this.lectureService.getAllLecturesByTeacher(teacherId).subscribe({
      next: (response) => {
        this.lecturesOfTeacher = response;
        this.classChildrenTeacherMenu = this.makeMenuListForTeacher(this.lecturesOfTeacher);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  makeMenu(studentLectures) {
    let children: any[] = [];
    for (let i = 0; i < studentLectures.length; i++) {
      let child = {
        title: studentLectures[i].name,
        link: `/pages/student-portal/my_class/${studentLectures[i].id}`
      }
      children.push(child);
    }
    return children;
  }

  makeMenuListForTeacher(teacherLectures) {
    let children: any[] = [];
    for (let i = 0; i < teacherLectures.length; i++) {
      let child = {
        title: teacherLectures[i].name,
        link: `/pages/teacher-portal/my_class/${teacherLectures[i].id}`
      }
      children.push(child);
    }
    return children;
  }

  getAllStudentViews(tempUserViews) {
    for (let i = 0; i < tempUserViews.length; i++) {
      if (tempUserViews[i].title == 'My Classes') {
        tempUserViews[i]["children"] = this.classChildrenMenu;
        break;
      }
    }
    console.log(tempUserViews);
    return tempUserViews;
  }

  getAllTeacherViews(tempTeacherViews) {
    for (let i = 0; i < tempTeacherViews.length; i++) {
      if (tempTeacherViews[i].title == 'My Classes') {
        tempTeacherViews[i]["children"] = this.classChildrenTeacherMenu;
        break;
      }
    }
    return tempTeacherViews;
  }

  // getLecturesOfTeacher(teacherId) {
  //   this.lectureService.getAllLecturesByTeacher(teacherId).subscribe({
  //     next: (response) => {
  //       this.lectures = response;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }


}


