import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotcoinsComponent } from './spotcoins.component';

describe('SpotcoinsComponent', () => {
  let component: SpotcoinsComponent;
  let fixture: ComponentFixture<SpotcoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotcoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotcoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
