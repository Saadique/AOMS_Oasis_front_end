import { Component, OnInit, TemplateRef } from '@angular/core';
import { CourseService } from 'app/services/course.service';
import { pluck } from 'rxjs/operators';
import { Alert } from '../create-course/create-course.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-medium',
  templateUrl: './edit-medium.component.html',
  styleUrls: ['./edit-medium.component.scss']
})
export class EditMediumComponent implements OnInit {

  availableMediums: [] = [];
  editMediumFormGroup: FormGroup;

  editMediumId;
  deleteMediumId;

  constructor(private courseService: CourseService, private dialogBoxService: NbDialogService,) { }

  mediumAlert = new Alert();

  ngOnInit(): void {
    this.loadMediums();
  }

  loadMediums() {
    this.courseService.getMediums()
      .pipe(
        pluck('data')
      )
      .subscribe((response: any) => {
        this.availableMediums = response;
      })
  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog, { context: 'Are you sure you want to delete this schedule?' });
  }

  private initForm(medium) {
    this.editMediumFormGroup = new FormGroup({
      'name': new FormControl(medium.name, Validators.required),
      'short_name': new FormControl(medium.short_name, Validators.required),
      'description': new FormControl(medium.description)
    });
  }

  editClick(medium, modal) {
    this.initForm(medium);
    this.editMediumId = medium.id;
    this.open(modal);
  }

  deleteClick(medium, modal) {
    this.deleteMediumId = medium.id;
    this.open(modal);
  }

  activateClick(medium) {
    this.courseService.activateMedium(medium.id).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.setAlert('success', 'Medium Activated Successfully');
          this.loadMediums();
        },
        error: (err) => {
          console.log(err);
          if (err.error.code == 400) {
            // this.alreadyExists = true;
            this.setAlert('Error', err.error.message);
          }
        }
      }
    )
  }


  onDeleteConfirmation(modal) {
    this.deleteMedium();
    modal.close();
  }

  //alert set
  setAlert(alertStatus, alertMessage): void {
    this.mediumAlert.status = alertStatus;
    this.mediumAlert.message = alertMessage;
    setTimeout(() => { this.mediumAlert = { "status": null, "message": null } }, 4500); // fade alert
  }

  editMedium(ref) {
    if (this.editMediumFormGroup.valid) {
      let data = {
        "name": this.editMediumFormGroup.value.name,
        "short_name": this.editMediumFormGroup.value.short_name,
        "description": this.editMediumFormGroup.value.description,
      }
      this.courseService.updateMedium(data, this.editMediumId).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.setAlert('success', 'Medium Updated Successfully');
            this.loadMediums();
            this.editMediumFormGroup.reset();
            ref.close();
          },
          error: (err) => {
            console.log(err);
            if (err.error.code == 400) {
              // this.alreadyExists = true;
              this.setAlert('Error', err.error.message);
            }
          }
        }
      )
    } else {
      this.setAlert('warning', 'Please fill all required fields');
    }
  }

  deleteMedium() {
    this.courseService.deleteMedium(this.deleteMediumId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.setAlert('success', 'Medium Deleted Successfully');
          this.loadMediums();
        },
        error: (err) => {
          console.log(err);
          if (err.error.code == 400) {
            // this.alreadyExists = true;
            this.setAlert('Error', err.error.message);
          }
        }
      }
    )
  }

}
