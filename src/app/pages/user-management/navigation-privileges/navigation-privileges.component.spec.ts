import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPrivilegesComponent } from './navigation-privileges.component';

describe('NavigationPrivilegesComponent', () => {
  let component: NavigationPrivilegesComponent;
  let fixture: ComponentFixture<NavigationPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
