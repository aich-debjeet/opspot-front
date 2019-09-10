import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreAudioComponent } from './explore-audio.component';

describe('ExploreAudioComponent', () => {
  let component: ExploreAudioComponent;
  let fixture: ComponentFixture<ExploreAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
