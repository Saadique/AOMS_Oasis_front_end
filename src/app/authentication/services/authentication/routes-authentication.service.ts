import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { LoginServiceService } from '../login/login-service.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesAuthenticationService implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginServiceService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let found = false;
    console.log(state.url);
    if (state.url != '/authentication/login') {
      if (this.loginService.isLoginSuccess()) {
        //check authorization
        let viewList: any[] = this.localStorageService.getData().userViews;
        console.log(viewList);
        for (let i = 0; i < viewList.length; i++) {
          if ('link' in viewList[i]) {
            if (state.url === viewList[i].link) {
              return true;
            }
          }
          if (this.checkChildNodeAuthorization(viewList[i], state.url) === true) {
            return true;
          }
        }
        return true;
      }
      this.router.navigateByUrl('/authentication/login')
      return false;
    } else {
      return true;
    }
  }

  //check authentication
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let found = false;
    console.log(state.url);
    if (state.url != '/authentication/login') {
      if (this.loginService.isLoginSuccess()) {
        //check authorization
        let viewList: any[] = this.localStorageService.getData().userViews;
        console.log(viewList);
        for (let i = 0; i < viewList.length; i++) {
          if ('link' in viewList[i]) {
            if (state.url === viewList[i].link) {
              return true;
            }
          }
          if (this.checkChildNodeAuthorization(viewList[i], state.url) === true) {
            return true;
          }
        }
      }
      this.router.navigateByUrl('/authentication/login')
      return false;
    } else {
      return true;
    }
  }

  foundChild = false;
  checkChildNodeAuthorization(parent, url) {
    console.log("in");
    // let found = false;
    if ('children' in parent) {
      let children: any[] = parent.children;
      for (let i = 0; i < children.length; i++) {
        if ('link' in children[i]) {
          if (url === children[i].link) {
            console.log(children[i]);
            this.foundChild = true;
            break;
          } else {
            this.checkChildNodeAuthorization(children[i], url);
          }
        } else {
          this.checkChildNodeAuthorization(children[i], url);
        }
      }
    }
    return this.foundChild;
  }

}
