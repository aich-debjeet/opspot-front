import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimezComponent } from './showtimez.component';

describe('ShowtimezComponent', () => {
  let component: ShowtimezComponent;
  let fixture: ComponentFixture<ShowtimezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtimezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
