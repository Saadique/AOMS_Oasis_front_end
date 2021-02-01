import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { ErrorsComponent } from './errors/errors.component';
import { NavigationPrivilegesComponent } from './navigation-privileges/navigation-privileges.component';

const routes: Routes = [
  {
    path: '', component: UserManagementComponent,
    children: [
      { path: 'user-roles', component: UserRolesComponent },
      { path: 'errors', component: ErrorsComponent },
      { path: 'privileges', component: NavigationPrivilegesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
