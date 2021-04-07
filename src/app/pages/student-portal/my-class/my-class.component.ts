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
      this.getAllLessons(routeParams.lectureId);
    });
  }

  getLecture(lectureId) {
    this.lectureService.getLectureById(lectureId).subscribe(
      (response) => {
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
    // this.lectureService.downloadFile(data).subscribe(
    //   response => { console.log(response.headers.get('Content-Type')); this.viewFileInBrowser(response) },
    //   error => console.log(error))


    this.lectureService.downloadFile(data).subscribe({
      next: (response) => {
        let type = response.headers.get('Content-Type');
        console.log(type);
        this.viewFileInBrowser(response, type)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  viewFileInBrowser(data, type) {
    const blob = new Blob([data], { type: type });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'any';
    link.click();
  }

}
