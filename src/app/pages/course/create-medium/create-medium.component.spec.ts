import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMediumComponent } from './create-medium.component';

describe('CreateMediumComponent', () => {
  let component: CreateMediumComponent;
  let fixture: ComponentFixture<CreateMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
