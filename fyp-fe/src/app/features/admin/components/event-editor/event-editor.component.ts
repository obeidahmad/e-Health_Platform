import {Component, OnInit} from '@angular/core';
import {DispensaryEvent, EventStructure} from "../../../../domain/admin/models/events";
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {EventsService} from "../../../../domain/admin/services/events.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";
import {AdminRoutes} from "../../../../domain/admin/admin-routes";

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {
  event!: DispensaryEvent;
  // updatedEvent: EventEmitter<DispensaryEvent> = new EventEmitter<DispensaryEvent>();
  public drawerSettings: { visible: boolean } = {
    visible: false
  };

  constructor(private _eventsService: EventsService,
              private _router: Router,
              private _nzMessage: NzMessageService) {
  }


  ngOnInit(): void {
    if (this.event == null) {
      this.event = {
        uid: '',
        title: '',
        date: (new Date()).toLocaleDateString(),
        structure: []
      }
    }

  }

  closeNewChunkDrawer() {
    this.drawerSettings.visible = !this.drawerSettings.visible;
  }

  closeFilter() {

  }

  openDrawerNew() {
    this.drawerSettings.visible = true;
  }

  addToStructure($event: EventStructure) {
    this.event.structure.push($event);
    this.drawerSettings.visible = false;
  }

  drop($event: CdkDragDrop<any, any>) {
    console.log($event)
  }


  addNewEvent() {
    this._eventsService.create(this.event);
    this._router.navigate([CoreRoutes.ADMIN, AdminRoutes.EVENTS])
      .then(_ => this._nzMessage.info("Event published!"))
  }

  removeSection(item: EventStructure) {
    const index= this.event.structure.indexOf(item);
    this.event.structure.splice(index, 1);
  }
}
