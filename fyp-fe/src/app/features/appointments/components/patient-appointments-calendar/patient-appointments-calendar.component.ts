import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from "../../../../domain/appointments/services/appointment.service";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {AppointmentDto} from "../../../../domain/appointments/models/appointment-dto";
import {CalendarComponent} from "../calendar/calendar.component";
import {UsersServiceService} from "../../../../domain/admin/services/users-service.service";
import {Staff} from "../../../../domain/admin/models/users";
import {AvailabilityService} from "../../../../domain/appointments/services/availability.service";
import {AvailabilityResponse} from "../../../../domain/appointments/models/availability-response";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-patient-appointments-calendar',
  templateUrl: './patient-appointments-calendar.component.html',
  styleUrls: ['./patient-appointments-calendar.component.css']
})
export class PatientAppointmentsCalendarComponent implements OnInit {
  appointments: AppointmentDto[] = [];
  loadingAppts = true;
  @ViewChild(CalendarComponent, {static: false}) calenar!: CalendarComponent;
  public drs: Staff[] = [];
  drawerSettings: any = {visible: false};

  date: Date = new Date();
  availability: AvailabilityResponse[] = [];
  private selectedDr!: Staff;

  constructor(private _apptService: AppointmentService,
              private _nzMessage: NzMessageService,
              private _availabilityService: AvailabilityService,
              private _staffService: UsersServiceService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadAppts((new Date().toISOString()).slice(0, 10))
    this.loadStaff();
  }

  loadStaff() {
    this._staffService.getAll()
      .ref.get().then(c => {
      this.drs = c.docs.map(data => {
        return {
          ...data.data(),
          uid: data.id
        }
      }).filter(item => item.role == 'doctor')
    })
  }

  loadAppts(startDate: string) {
    console.log(startDate)
    this._apptService.getAllUserAppointments({
      id: this._authService.getCurrentUserId(),
      timeframe: "MONTH",
      date: startDate, //date.toISOString().replace(/\//g, "-").split('T')[0]
    }).subscribe({
      next: (res) => {
        this.appointments = res;
        this.loadingAppts = false;
      },
      error: (err) => {
        this.loadingAppts = false;
      },
      complete: () => {
        this.calenar.updateAppt(this.appointments);
      }
    })
  }

  makeAppt($event: MouseEvent, panel: Staff) {
    this.selectedDr = panel;
    $event.stopPropagation();
    this._availabilityService.getDrAvailability({
      timeframe: "MONTH",
      date: (new Date().toISOString()).slice(0, 10),
      id: panel.uid
    }).subscribe({
      next: (res) => {
        console.log(res)
        this.availability = res;
        // this.disabledWeekendsAndPrevious = (value: Date): boolean => {
        //   return this.disableUsed(value);
        // };
      }
    })
    this.drawerSettings.visible = true;
    // this.date = [];
  }


  closeNewChunkDrawer() {
    this.drawerSettings.visible = false;
  }


  onValueChange($event: Date) {
    this._availabilityService.getDrAvailability({
      timeframe: "MONTH",
      date: (new Date($event).toISOString()).slice(0, 10),
      id: this.selectedDr.uid
    }).subscribe({
      next: (res) => {
        this.availability = res;
      }
    })
  }

  takeTheAppointmenteuh() {
    this._apptService.setAppointment({
      userId: this._authService.getCurrentUserId(),
      doctorId: this.selectedDr.uid,
      date: this.date.toISOString()
    }).subscribe({
      next: () => {
        this.loadAppts((new Date().toISOString()).slice(0, 10))
      },
      error: err => this._nzMessage.error(err)
    })
  }
}
