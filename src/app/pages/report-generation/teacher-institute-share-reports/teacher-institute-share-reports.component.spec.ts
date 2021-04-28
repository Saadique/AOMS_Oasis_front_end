import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInstituteShareReportsComponent } from './teacher-institute-share-reports.component';

describe('TeacherInstituteShareReportsComponent', () => {
  let component: TeacherInstituteShareReportsComponent;
  let fixture: ComponentFixture<TeacherInstituteShareReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInstituteShareReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInstituteShareReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
