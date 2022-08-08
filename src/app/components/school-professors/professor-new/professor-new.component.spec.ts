import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorNewComponent } from './professor-new.component';

describe('ProfessorNewComponent', () => {
  let component: ProfessorNewComponent;
  let fixture: ComponentFixture<ProfessorNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
