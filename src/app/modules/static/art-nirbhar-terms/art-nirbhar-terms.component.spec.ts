import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtNirbharTermsComponent } from './art-nirbhar-terms.component';

describe('ArtNirbharTermsComponent', () => {
  let component: ArtNirbharTermsComponent;
  let fixture: ComponentFixture<ArtNirbharTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtNirbharTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtNirbharTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
