import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJourneyFormComponent } from './my-journey-form.component';

describe('MyJourneyFormComponent', () => {
  let component: MyJourneyFormComponent;
  let fixture: ComponentFixture<MyJourneyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJourneyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJourneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
