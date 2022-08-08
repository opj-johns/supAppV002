import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewEditComponent } from './view-new-edit.component';

describe('ViewNewEditComponent', () => {
  let component: ViewNewEditComponent;
  let fixture: ComponentFixture<ViewNewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
