import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentSchemeComponent } from './create-payment-scheme.component';

describe('CreatePaymentSchemeComponent', () => {
  let component: CreatePaymentSchemeComponent;
  let fixture: ComponentFixture<CreatePaymentSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaymentSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
