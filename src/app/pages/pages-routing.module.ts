import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { RoutesAuthenticationService } from 'app/authentication/services/authentication/routes-authentication.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [RoutesAuthenticationService],
  children: [
    // {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    //   // canActivate: [RoutesAuthenticationService]
    // },
    // {
    //   path: 'iot-dashboard',
    //   component: DashboardComponent,
    // },
    // {
    //   path: 'layout',
    //   loadChildren: () => import('./layout/layout.module')
    //     .then(m => m.LayoutModule),
    // },
    // {
    //   path: 'forms',
    //   loadChildren: () => import('./forms/forms.module')
    //     .then(m => m.FormsModule),
    // },
    // {
    //   path: 'ui-features',
    //   loadChildren: () => import('./ui-features/ui-features.module')
    //     .then(m => m.UiFeaturesModule),
    // },
    // {
    //   path: 'modal-overlays',
    //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
    //     .then(m => m.ModalOverlaysModule),
    // },
    // {
    //   path: 'extra-components',
    //   loadChildren: () => import('./extra-components/extra-components.module')
    //     .then(m => m.ExtraComponentsModule),
    // },
    // {
    //   path: 'maps',
    //   loadChildren: () => import('./maps/maps.module')
    //     .then(m => m.MapsModule),
    // },
    // {
    //   path: 'charts',
    //   loadChildren: () => import('./charts/charts.module')
    //     .then(m => m.ChartsModule),
    // },
    // {
    //   path: 'editors',
    //   loadChildren: () => import('./editors/editors.module')
    //     .then(m => m.EditorsModule),
    // },
    // {
    //   path: 'tables',
    //   loadChildren: () => import('./tables/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'miscellaneous',
    //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
    //     .then(m => m.MiscellaneousModule),
    // },
    // {
    //   path: '',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full',
    // },
    {
      path: 'course',
      loadChildren: () => import('./course/course.module')
        .then(m => m.CourseModule),
      canActivate: [RoutesAuthenticationService],
    },
    {
      path: 'student',
      loadChildren: () => import('./student/student.module')
        .then(m => m.StudentModule),
      canActivate: [RoutesAuthenticationService],
    },
    {
      path: 'teachers',
      loadChildren: () => import('./teacher/teacher.module')
        .then(m => m.TeacherModule),
      canActivate: [RoutesAuthenticationService],
    },
    {
      path: 'student-portal',
      loadChildren: () => import('./student-portal/student-portal.module')
        .then(m => m.StudentPortalModule),
      canActivate: [RoutesAuthenticationService]
    },
    {
      path: 'teacher-portal',
      loadChildren: () => import('./teacher-portal/teacher-portal.module')
        .then(m => m.TeacherPortalModule),
      canActivate: [RoutesAuthenticationService]
    },
    {
      path: 'user-management',
      loadChildren: () => import('./user-management/user-management.module')
        .then(m => m.UserManagementModule),
      canActivate: [RoutesAuthenticationService]
    },
    {
      path: 'reports',
      loadChildren: () => import('./report-generation/report-generation.module')
        .then(m => m.ReportGenerationModule),
      canActivate: [RoutesAuthenticationService]
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module')
        .then(m => m.AdminModule),
      canActivate: [RoutesAuthenticationService]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [RoutesAuthenticationService]
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
