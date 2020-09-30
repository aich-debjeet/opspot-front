import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTalentiListComponent } from './mobile-talenti-list.component';

describe('MobileTalentiListComponent', () => {
  let component: MobileTalentiListComponent;
  let fixture: ComponentFixture<MobileTalentiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTalentiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTalentiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
