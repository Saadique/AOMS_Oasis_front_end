import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRenumerationsComponent } from './my-renumerations.component';

describe('MyRenumerationsComponent', () => {
  let component: MyRenumerationsComponent;
  let fixture: ComponentFixture<MyRenumerationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRenumerationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRenumerationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
