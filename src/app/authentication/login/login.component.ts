import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthService, NbAuthSocialLink, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LoginService } from '../../services/login.service';
import { LoginServiceService } from '../services/login/login-service.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  loginForm: FormGroup;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private localStorageService: LocalStorageService
  ) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  ngOnInit(): void {

  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    console.log(this.user);

    this.loginService.authenticate(this.user).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.localStorageService.setToken(response.token);
          this.localStorageService.setData(response);
          console.log(window.localStorage.getItem('user-data'));
          switch (response.userRoleId) {
            case 1:
              return this.router.navigateByUrl('/pages/teacher-portal/dashboard');
            case 2:
              return this.router.navigateByUrl('/pages/student-portal/dashboard');
            case 3:
              return this.router.navigateByUrl('/pages/course/create');
          }
        },
        error: (err) => {
          // if (err.error.code == 400) {
          //   // this.alreadyExists = true;
          //   // this.setAlert('Error', err.error.message);
          //   this.errors.push(err.error.message);
          // }
          // this.errors = err.error.message;
          // alert(err.error.message);
          console.log(err.error)
        }
      })

    // this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;

    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //   } else {
    //     this.errors = result.getErrors();
    //   }

    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.cd.detectChanges();
    // });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}


