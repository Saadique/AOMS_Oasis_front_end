import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from '../../../services/lecture.service';

@Component({
  selector: 'ngx-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.scss']
})
export class MyClassComponent implements OnInit {

  lectureId;
  lecture;
  lessons;

  constructor(
    private route: ActivatedRoute,
    private lectureService: LectureService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.lectureId = routeParams.lectureId;
      this.getAllLessons(routeParams.lectureId);
    });
  }

  getLecture(lectureId) {
    this.lectureService.getLectureById(lectureId).subscribe(
      (response: any) => {
        this.lecture = response.data;
        console.log(this.lecture);
        // this.getLessonsByLecture();
      }
    )
  }

  getAllLessons(lectureId) {
    this.lectureService.getAllLessonsWithMaterials(lectureId).subscribe({
      next: (response) => {
        console.log(response);
        this.lessons = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  downloadFile(material) {
    let data = {
      "file_path": material.path
    }
    this.lectureService.downloadFile(data).subscribe({
      next: (response) => {
        console.log(response.body);
        this.viewFileInBrowser(response.body, response.headers.get('Content-Type'))
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  viewFileInBrowser(file, type) {
    let blob = new Blob([file], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
  }

}
