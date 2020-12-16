import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluestoreTermsComponent } from './bluestore-terms.component';

describe('BluestoreTermsComponent', () => {
  let component: BluestoreTermsComponent;
  let fixture: ComponentFixture<BluestoreTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluestoreTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluestoreTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
