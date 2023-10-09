import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {AppointmentDto} from "../../../../domain/appointments/models/appointment-dto";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @Input() takeApptAction: boolean = false;
  @Output() dateSelected: EventEmitter<DateSelectArg> = new EventEmitter<DateSelectArg>();
  @Output() dateChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() appointments: AppointmentDto[] = [];

  currentEvents: EventApi[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.appointments.map(appt => {
      return {
        id: appt.id,
        title: "Appointment",
        start: appt.date,
        end: this.addMinutes(new Date(appt.date), 15)

      }
    }), // alternatively, use the `events` setting to fetch from a feed
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    datesSet: this.handleDateChanged.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleDateChanged(changedEvent: any) {
    const d = new Date(changedEvent.start);
    d.setMonth(d.getMonth()  )
    this.dateChanged.emit(d.toISOString().slice(0, 10));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.dateSelected.emit(selectInfo);
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.updateAppt([...this.appointments])
  }

  updateAppt(appts: AppointmentDto[]) {
    this.calendarOptions.events = appts.map(appt => {
      return {
        id: appt.id,
        title: "Appointment",
        start: appt.date,
        end: this.addMinutes(new Date(appt.date), 15)

      }
    })
  }

  private addMinutes(date: Date, minutes: number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }


}
