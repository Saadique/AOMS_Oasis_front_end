import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureOperationsComponent } from './lecture-operations.component';

describe('LectureOperationsComponent', () => {
  let component: LectureOperationsComponent;
  let fixture: ComponentFixture<LectureOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
