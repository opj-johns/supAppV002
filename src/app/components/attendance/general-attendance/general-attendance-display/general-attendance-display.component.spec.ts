import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAttendanceDisplayComponent } from './general-attendance-display.component';

describe('GeneralAttendanceDisplayComponent', () => {
  let component: GeneralAttendanceDisplayComponent;
  let fixture: ComponentFixture<GeneralAttendanceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAttendanceDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAttendanceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
