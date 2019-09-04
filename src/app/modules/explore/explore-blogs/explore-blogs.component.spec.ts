import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreBlogsComponent } from './explore-blogs.component';

describe('ExploreBlogsComponent', () => {
  let component: ExploreBlogsComponent;
  let fixture: ComponentFixture<ExploreBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
