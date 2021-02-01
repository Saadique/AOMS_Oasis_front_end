import { Component } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  styleUrls: ['./authentication.component.scss'],
  template: `
  <nb-layout>
  <nb-layout-header>Oasis School Of Business And Technology</nb-layout-header>
  <nb-layout-column class="colored-column-basic">
    <nb-card>
      <nb-card-header>
          Login
      </nb-card-header>
      <nb-card-body>
        <nb-auth-block>
          <router-outlet></router-outlet>
        </nb-auth-block>
      </nb-card-body>
    </nb-card>
  </nb-layout-column>
  <nb-layout-footer>Contact us</nb-layout-footer>
</nb-layout>
  `
})
export class AuthenticationComponent {
}
