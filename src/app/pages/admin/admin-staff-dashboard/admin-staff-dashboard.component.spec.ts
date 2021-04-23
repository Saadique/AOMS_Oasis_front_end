import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffDashboardComponent } from './admin-staff-dashboard.component';

describe('AdminStaffDashboardComponent', () => {
  let component: AdminStaffDashboardComponent;
  let fixture: ComponentFixture<AdminStaffDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStaffDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
