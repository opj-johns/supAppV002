import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAttendanceDisplayComponent } from './weekly-attendance-display.component';

describe('WeeklyAttendanceDisplayComponent', () => {
  let component: WeeklyAttendanceDisplayComponent;
  let fixture: ComponentFixture<WeeklyAttendanceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyAttendanceDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyAttendanceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
