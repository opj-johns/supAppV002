import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProfessorsComponent } from './school-professors.component';

describe('SchoolProfessorsComponent', () => {
  let component: SchoolProfessorsComponent;
  let fixture: ComponentFixture<SchoolProfessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolProfessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
