import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreVideoComponent } from './explore-video.component';

describe('ExploreVideoComponent', () => {
  let component: ExploreVideoComponent;
  let fixture: ComponentFixture<ExploreVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
