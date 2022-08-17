import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWeeklyAttendaceComponent } from './create-weekly-attendace.component';

describe('CreateWeeklyAttendaceComponent', () => {
  let component: CreateWeeklyAttendaceComponent;
  let fixture: ComponentFixture<CreateWeeklyAttendaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWeeklyAttendaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWeeklyAttendaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
