import { Component } from '@angular/core';
import { ViewsService } from 'app/services/views.service';
import { MENU_ITEMS } from './pages-menu';
import { LectureService } from '../services/lecture.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  studentLectures;
  menu;

  constructor(private viewsService: ViewsService, private lectureService: LectureService) {
    this.menu = MENU_ITEMS;
    this.initUser();
    this.makeLectureMenuOfStudents();
  }

  // menu;

  userData;
  classChildrenMenu;

  initUser() {
    let data: any = window.localStorage.getItem('user-data');
    this.userData = JSON.parse(data);
    // this.menu = this.userData.userViews;
  }

  getAllViews() {
    if (this.userData.userRoleId == 2) {
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].title == 'Student-Portal') {
          let studPortal = this.menu[i];
          for (let j = 0; j < studPortal.children.length; j++) {
            if (studPortal.children[j].title == 'My Classes') {
              // console.log(this.menu[i].children[j]);
              console.log(this.classChildrenMenu);
              this.menu[i].children[j]["children"] = this.classChildrenMenu;
              // console.log(this.menu[i].children[j]);
              break;
            }
          }
        }
      }
    }
  }

  makeLectureMenuOfStudents() {
    if (this.userData.userRoleId == 2) {
      let studentId = this.userData.student.id;
      this.lectureService.getAllLectureByStudent(studentId).subscribe(
        {
          next: (response) => {
            // console.log(response);
            this.studentLectures = response;
            this.classChildrenMenu = this.makeMenu(this.studentLectures);
            // console.log(this.classChildrenMenu);
            this.getAllViews();
          },
          error: (err) => {
            console.log(err)
          }
        }
      )
    }
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

}
