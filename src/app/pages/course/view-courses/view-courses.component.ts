import { Component, OnInit, } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'ngx-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  allCourses: [];
  items: NbMenuItem[] = [];

  ngOnInit(): void {
    this.getAllCourses();
  }


  loadNbList() {
    for (var i = 0; i < this.allCourses.length; i++) {

      let course: any = this.allCourses[i];
      let courseItem = {
        title: course.course.name,
        children: []
      }

      for (var j = 0; j < course.course_mediums.length; j++) {
        let courseMedium: any = course.course_mediums[j];
        let child = {
          title: courseMedium.name,
          link: `${courseMedium.id}`
        }
        courseItem.children.push(child)
      }

      this.items.push(courseItem);
    }
  }

  getAllCourses() {
    this.courseService.getAllCoursesWithMediums()
      .subscribe((response) => {
        this.allCourses = response;
        console.log(this.allCourses);
        this.loadNbList();
      })
  }






}
