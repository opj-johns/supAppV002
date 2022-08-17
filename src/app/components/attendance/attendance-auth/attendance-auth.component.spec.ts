import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceAuthComponent } from './attendance-auth.component';

describe('AttendanceAuthComponent', () => {
  let component: AttendanceAuthComponent;
  let fixture: ComponentFixture<AttendanceAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
