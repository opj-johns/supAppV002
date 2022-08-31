import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAttendanceComponent } from './general-attendance.component';

describe('GeneralAttendanceComponent', () => {
  let component: GeneralAttendanceComponent;
  let fixture: ComponentFixture<GeneralAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
