import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRemunerationReportsComponent } from './teacher-remuneration-reports.component';

describe('TeacherRemunerationReportsComponent', () => {
  let component: TeacherRemunerationReportsComponent;
  let fixture: ComponentFixture<TeacherRemunerationReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRemunerationReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRemunerationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
