import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardVideoComponent } from './hard-video.component';

describe('HardVideoComponent', () => {
  let component: HardVideoComponent;
  let fixture: ComponentFixture<HardVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
