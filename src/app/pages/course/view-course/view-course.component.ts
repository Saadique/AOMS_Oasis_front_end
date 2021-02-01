import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { SubjectService } from '../../../services/subject.service';
import { LectureService } from '../../../services/lecture.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'ngx-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private lectureService: LectureService) { }

  courseMediumId;
  course;
  subjects: [];
  lectures: [];
  editFormDisplay: boolean = false;

  ngOnInit(): void {
    this.courseMediumId = this.route.snapshot.paramMap.get('id');
    this.loadAllSubjectsByCourse();
    this.loadAllLecturesByCourse();
    this.loadCourse();
  }

  loadAllSubjectsByCourse() {
    this.subjectService.getAllSubjectsByCourseMeidum(this.courseMediumId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
        this.subjects = response;
      })
  }

  loadAllLecturesByCourse() {
    this.lectureService.getAllLecturesByCourseMedium(this.courseMediumId)
      .pipe(
        pluck('data')
      ).subscribe((response) => {
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

  editClick() {
    this.editFormDisplay = true;
  }

  cancelEditForm() {
    this.editFormDisplay = false;
  }


}
