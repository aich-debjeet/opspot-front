import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImgCropperComponent } from './ngx-img-cropper.component';

describe('NgxImgCropperComponent', () => {
  let component: NgxImgCropperComponent;
  let fixture: ComponentFixture<NgxImgCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxImgCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxImgCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
