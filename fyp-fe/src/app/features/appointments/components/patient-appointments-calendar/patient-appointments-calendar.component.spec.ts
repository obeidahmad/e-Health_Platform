import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentsCalendarComponent } from './patient-appointments-calendar.component';

describe('PatientAppointmentsCalendarComponent', () => {
  let component: PatientAppointmentsCalendarComponent;
  let fixture: ComponentFixture<PatientAppointmentsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAppointmentsCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAppointmentsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
