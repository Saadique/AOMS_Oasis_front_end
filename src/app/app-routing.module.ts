import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoutesAuthenticationService } from './authentication/services/authentication/routes-authentication.service';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [RoutesAuthenticationService]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'teacher', loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'student-portal', loadChildren: () => import('./pages/student-portal/student-portal.module').then(m => m.StudentPortalModule) },
  { path: 'teacher-portal', loadChildren: () => import('./pages/teacher-portal/teacher-portal.module').then(m => m.TeacherPortalModule) },
  { path: 'user-management', loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule) },
  { path: 'report-generation', loadChildren: () => import('./pages/report-generation/report-generation.module').then(m => m.ReportGenerationModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
