import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  constructor(private dialogBoxService: NbDialogService) { }

  ngOnInit(): void {
  }

  addNewRole(ref, data) {

  }

  open(dialog: TemplateRef<any>) {
    this.dialogBoxService.open(dialog, { context: 'Are you sure you want to delete this schedule?' });
  }

  onAddClick(dialog: TemplateRef<any>) {
    this.open(dialog);
  }


}
