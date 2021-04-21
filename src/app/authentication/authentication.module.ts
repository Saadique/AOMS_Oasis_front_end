import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  NbLayoutModule,
  NbAlertModule,
  NbCheckboxModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { NbAuthModule } from '@nebular/auth';
import { AuthenticationRoutingModule, routedComponents } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [...routedComponents, AuthenticationComponent, LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    RouterModule,
    NbLayoutModule,
    ThemeModule,
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbAuthModule,
    NbCardModule
  ]
})
export class AuthenticationModule { }
