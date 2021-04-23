import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../../authentication/services/local-storage/local-storage.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;


  currentTheme = 'default';

  userMenu;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private localStorageService: LocalStorageService) {
  }

  name;

  loggedInUser;
  role;
  getUserRoleId() {
    this.loggedInUser = this.localStorageService.getData();
    this.role = this.loggedInUser.userRole;
    this.getName();
    this.initUserMenu();
  }

  getName() {
    if (this.role == "Admin") {
      this.name = this.loggedInUser.admin.first_name;
    }
    if (this.role == "Student") {
      this.name = this.loggedInUser.student.name;
    }
    if (this.role == "Teacher") {
      this.name = this.loggedInUser.teacher.name;
    }
    if (this.role == "Administrative Staff") {
      this.name = this.loggedInUser.administrative_staff.first_name;
    }
  }

  initUserMenu() {
    if (this.role == "Student" || this.role == "Teacher") {
      this.userMenu = [{ title: 'Profile', link: '/pages/profile' }, { title: 'Log out', link: '/authentication' }];
    } else if (this.role == "Admin") {
      this.userMenu = [{ title: 'Profile', link: 'pages/user-management/accounts' }, { title: 'Log out', link: '/authentication' }];
    } else {
      this.userMenu = [{ title: 'Log out', link: '/authentication' }]
    }
  }


  ngOnInit() {
    this.getUserRoleId();
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
