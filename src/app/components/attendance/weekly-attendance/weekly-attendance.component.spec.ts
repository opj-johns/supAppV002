import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAttendanceComponent } from './weekly-attendance.component';

describe('WeeklyAttendanceComponent', () => {
  let component: WeeklyAttendanceComponent;
  let fixture: ComponentFixture<WeeklyAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
