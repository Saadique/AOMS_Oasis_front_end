import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAlertModule,
  NbAccordionModule,
  NbStepperModule,
  NbMenuModule,
  NbTabsetModule,
  NbLayoutModule,
  NbListModule,
  NbBadgeModule
} from '@nebular/theme';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { ErrorsComponent } from './errors/errors.component';
import { NavigationPrivilegesComponent } from './navigation-privileges/navigation-privileges.component';

@NgModule({
  declarations: [UserManagementComponent, UserRolesComponent, ErrorsComponent, NavigationPrivilegesComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ThemeModule,
    NbAlertModule,
    RouterModule,
    NbAccordionModule,
    NbStepperModule,
    NbMenuModule,
    NbTabsetModule,
    NbListModule,
    NbBadgeModule
  ]
})
export class UserManagementModule { }
