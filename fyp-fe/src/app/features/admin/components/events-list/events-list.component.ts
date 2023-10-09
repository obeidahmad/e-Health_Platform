import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../../../domain/admin/services/events.service";
import {DispensaryEvent, EventStructure} from "../../../../domain/admin/models/events";
import {da} from "date-fns/locale";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  radioValue: "new" | "old" = "new";
  events: DispensaryEvent[] = []
  loading: boolean = true;

  constructor(private _eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent() {
    this.loading = true;
    this._eventsService.getAll()
      .ref.get().then(c => {
      this.events = c.docs.map(data => {
        return {
          ...data.data(),
          // @ts-ignore
          date: data.data().date.toDate(),
          uid: data.id
        }
      })        .filter(event => (this.radioValue == 'new') ? event.date >= new Date() : event.date < new Date());
      this.loading = false
    })
  }


  deleteEvent(panel: DispensaryEvent) {
    this._eventsService.delete(panel.uid);
    this.loadEvent();
  }
}
