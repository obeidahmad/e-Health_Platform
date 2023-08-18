import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DispensaryEvent} from "../../../../domain/admin/models/events";

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {
  @Input() event!: DispensaryEvent;
  @Output() updatedEvent: EventEmitter<DispensaryEvent> = new EventEmitter<DispensaryEvent>();
  public drawerSettings: { visible: boolean } = {
    visible: false
  };

  constructor() { }

  ngOnInit(): void {
    this.event = {
      title: "",
      date: "",
      structure: []
    }
  }

  closeNewChunkDrawer() {
    this.drawerSettings.visible = !this.drawerSettings.visible;
  }

  closeFilter() {

  }
}
