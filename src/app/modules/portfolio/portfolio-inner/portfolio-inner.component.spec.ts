import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioInnerComponent } from './portfolio-inner.component';

describe('PortfolioInnerComponent', () => {
  let component: PortfolioInnerComponent;
  let fixture: ComponentFixture<PortfolioInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
