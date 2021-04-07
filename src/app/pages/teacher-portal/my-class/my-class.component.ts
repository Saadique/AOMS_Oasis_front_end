import { Component, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LectureService } from '../../../services/lecture.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.scss']
})
export class MyClassComponent implements OnInit {

  lectureId;
  lecture;
  lessons;
  selectedLessonId;
  selectedFileMaterial: File = null;
  newFile: File = null;
  lessonMaterials: [] = [];

  createForm: FormGroup;
  materialForm: FormGroup;
  editForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private lectureService: LectureService,
    private dialogBoxService: NbDialogService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.selectedLessonId = null;
      this.lessonMaterials = [];
      this.getLecture(routeParams.lecture_id);
      this.initForm();
      this.initMaterialForm();
    });
  }

  getLecture(lectureId) {
    this.lectureService.getLectureById(lectureId).subscribe(
      (response) => {
        this.lecture = response.data;
        this.getLessonsByLecture();

      }
    )
  }

  //Initialize create form
  private initForm() {
    this.createForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
    });
  }

  private initMaterialForm() {
    this.materialForm = new FormGroup({
      'file_name': new FormControl(null, Validators.required)
    });
  }

  onAddLessonClick(dialog: TemplateRef<any>) {
    this.open(dialog);
  }

  onAddMaterialClick(dialog) {
    if (this.selectedLessonId != null) {
      this.open(dialog);
    }
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog);
  }


  createLesson(ref) {
    let data = {
      "lecture_id": this.lecture.id,
      "name": this.createForm.value.name,
      "description": this.createForm.value.description
    }

    this.lectureService.createLesson(data).subscribe({
      next: (response) => {
        console.log(response)
        this.createForm.reset();
        this.getLessonsByLecture();
        ref.close();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getLessonsByLecture() {
    this.lectureService.getLessonsByLecture(this.lecture.id).subscribe({
      next: (response) => {
        this.lessons = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  selectLesson(lessonId) {
    this.selectedLessonId = lessonId;
    this.getMaterialsByLesson();
  }


  onFileSelected(event) {
    this.selectedFileMaterial = event.target.files[0];
  }

  onEditFileSelect(event) {
    this.newFile = event.target.files[0];
  }


  createMaterial(refM) {
    console.log(this.selectedFileMaterial);
    if (this.selectedFileMaterial != null && this.materialForm.valid) {
      const formData = new FormData();
      formData.append('lesson_id', this.selectedLessonId);
      formData.append('lecture_id', this.lecture.id);
      formData.append('file_name', this.materialForm.value.file_name);
      formData.append('file', this.selectedFileMaterial, this.selectedFileMaterial.name);

      this.lectureService.storeLessonMaterial(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.getMaterialsByLesson();
          this.materialForm.reset();
          refM.close();
        },
        error: (err) => {
          console.log(err);
        }
      })

    }
  }

  getMaterialsByLesson() {
    this.lectureService.getMaterialsByLesson(this.selectedLessonId).subscribe({
      next: (response) => {
        this.lessonMaterials = response;
      },
      error: (err) => {

      }
    })
  }

  selectedFilepath;
  selectedEditMaterial;

  editClick(material, dialog: TemplateRef<any>) {
    this.open(dialog);
    this.editForm = new FormGroup({
      'file_name': new FormControl(material.file_name, Validators.required),
    });
    this.selectedEditMaterial = material;
    this.selectedFilepath = material.path
  }

  downloadFile() {
    let data = {
      "file_path": this.selectedFilepath
    }
    // this.lectureService.downloadFile(data).subscribe(
    //   response => { console.log(response.headers.get('Content-Type')); this.viewFileInBrowser(response) },
    //   error => console.log(error))


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
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    // saveAs(blob, 'h.pdf');
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download = 'any';
    // link.click();
  }

  // not complete
  EditMaterials(ref) {
    if (this.newFile != null && this.editForm.valid) {
      console.log("came");
      const formData = new FormData();
      formData.append('file_name', this.materialForm.value.file_name);
      formData.append('file', this.newFile, this.newFile.name);
      formData.append('hasFile', 'true');

      this.lectureService.updateLessonMaterial(this.selectedEditMaterial.id, formData).subscribe({
        next: (response) => {
          console.log(response);
          ref.close();
          this.newFile = null;
        },
        error: (err) => {
          console.log(err);
        }
      })

    }

    if (this.newFile == null && this.editForm.valid) {
      const formData = new FormData();
      formData.append('file_name', this.materialForm.value.file_name);
      formData.append('hasFile', 'false');

      this.lectureService.updateLessonMaterial(this.selectedEditMaterial.id, formData).subscribe({
        next: (response) => {
          console.log(response);
          ref.close();
          this.newFile = null;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }


}
