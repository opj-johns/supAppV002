import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeneralAttendanceComponent } from './create-general-attendance.component';

describe('CreateGeneralAttendanceComponent', () => {
  let component: CreateGeneralAttendanceComponent;
  let fixture: ComponentFixture<CreateGeneralAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGeneralAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGeneralAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
