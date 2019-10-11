import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluestoreComponent } from './bluestore.component';

describe('BluestoreComponent', () => {
  let component: BluestoreComponent;
  let fixture: ComponentFixture<BluestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
