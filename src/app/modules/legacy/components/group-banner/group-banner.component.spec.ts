import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBannerComponent } from './group-banner.component';

describe('GroupBannerComponent', () => {
  let component: GroupBannerComponent;
  let fixture: ComponentFixture<GroupBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
