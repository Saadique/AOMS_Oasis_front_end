import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeReportsComponent } from './fee-reports.component';

describe('FeeReportsComponent', () => {
  let component: FeeReportsComponent;
  let fixture: ComponentFixture<FeeReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
