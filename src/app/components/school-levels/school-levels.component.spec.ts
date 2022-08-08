import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLevelsComponent } from './school-levels.component';

describe('SchoolLevelsComponent', () => {
  let component: SchoolLevelsComponent;
  let fixture: ComponentFixture<SchoolLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
