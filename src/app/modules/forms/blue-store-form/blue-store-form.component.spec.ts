import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueStoreFormComponent } from './blue-store-form.component';

describe('BlueStoreFormComponent', () => {
  let component: BlueStoreFormComponent;
  let fixture: ComponentFixture<BlueStoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueStoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
