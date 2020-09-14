import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InTheSpotlightComponent } from './in-the-spotlight.component';

describe('InTheSpotlightComponent', () => {
  let component: InTheSpotlightComponent;
  let fixture: ComponentFixture<InTheSpotlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InTheSpotlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InTheSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
