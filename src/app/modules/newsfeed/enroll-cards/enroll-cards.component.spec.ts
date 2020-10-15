import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCardsComponent } from './enroll-cards.component';

describe('EnrollCardsComponent', () => {
  let component: EnrollCardsComponent;
  let fixture: ComponentFixture<EnrollCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
