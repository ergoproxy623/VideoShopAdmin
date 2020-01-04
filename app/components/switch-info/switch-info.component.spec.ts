import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchInfoComponent } from './switch-info.component';

describe('SwitchInfoComponent', () => {
  let component: SwitchInfoComponent;
  let fixture: ComponentFixture<SwitchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
