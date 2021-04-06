import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentAttendancesComponent } from './my-student-attendances.component';

describe('MyStudentAttendancesComponent', () => {
  let component: MyStudentAttendancesComponent;
  let fixture: ComponentFixture<MyStudentAttendancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentAttendancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
