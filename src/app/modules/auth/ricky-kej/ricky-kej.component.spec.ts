import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RickyKejComponent } from './ricky-kej.component';

describe('RickyKejComponent', () => {
  let component: RickyKejComponent;
  let fixture: ComponentFixture<RickyKejComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RickyKejComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RickyKejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
