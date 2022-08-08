import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableCreateComponent } from './time-table-create.component';

describe('TimeTableCreateComponent', () => {
  let component: TimeTableCreateComponent;
  let fixture: ComponentFixture<TimeTableCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
