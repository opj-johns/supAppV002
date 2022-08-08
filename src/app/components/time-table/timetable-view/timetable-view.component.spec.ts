import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableViewComponent } from './timetable-view.component';

describe('TimetableViewComponent', () => {
  let component: TimetableViewComponent;
  let fixture: ComponentFixture<TimetableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
