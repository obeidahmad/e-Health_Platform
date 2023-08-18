import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DispensaryEvent} from "../../../../domain/admin/models/events";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
