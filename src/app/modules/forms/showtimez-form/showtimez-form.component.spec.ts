import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimezFormComponent } from './showtimez-form.component';

describe('ShowtimezFormComponent', () => {
  let component: ShowtimezFormComponent;
  let fixture: ComponentFixture<ShowtimezFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtimezFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtimezFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
