import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PediaInnerComponent } from './pedia-inner.component';

describe('PediaInnerComponent', () => {
  let component: PediaInnerComponent;
  let fixture: ComponentFixture<PediaInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PediaInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PediaInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
