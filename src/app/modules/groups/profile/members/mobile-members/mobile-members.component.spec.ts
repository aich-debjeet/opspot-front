import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMembersComponent } from './mobile-members.component';

describe('MobileMembersComponent', () => {
  let component: MobileMembersComponent;
  let fixture: ComponentFixture<MobileMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
