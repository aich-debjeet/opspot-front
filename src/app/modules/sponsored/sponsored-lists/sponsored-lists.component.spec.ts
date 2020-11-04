import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoredListsComponent } from './sponsored-lists.component';

describe('SponsoredListsComponent', () => {
  let component: SponsoredListsComponent;
  let fixture: ComponentFixture<SponsoredListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsoredListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsoredListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
