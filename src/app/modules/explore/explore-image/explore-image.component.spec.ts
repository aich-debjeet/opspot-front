import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreImageComponent } from './explore-image.component';

describe('ExploreImageComponent', () => {
  let component: ExploreImageComponent;
  let fixture: ComponentFixture<ExploreImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
