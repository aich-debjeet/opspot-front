import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReportComponent } from './profile-report.component';

describe('ProfileReportComponent', () => {
  let component: ProfileReportComponent;
  let fixture: ComponentFixture<ProfileReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
