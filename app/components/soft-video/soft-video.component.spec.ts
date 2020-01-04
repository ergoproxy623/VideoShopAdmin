import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftVideoComponent } from './soft-video.component';

describe('SoftVideoComponent', () => {
  let component: SoftVideoComponent;
  let fixture: ComponentFixture<SoftVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
