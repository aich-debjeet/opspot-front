import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInviteComponent } from './mobile-invite.component';

describe('MobileInviteComponent', () => {
  let component: MobileInviteComponent;
  let fixture: ComponentFixture<MobileInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
