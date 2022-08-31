import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordObservationComponent } from './record-observation.component';

describe('RecordObservationComponent', () => {
  let component: RecordObservationComponent;
  let fixture: ComponentFixture<RecordObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
