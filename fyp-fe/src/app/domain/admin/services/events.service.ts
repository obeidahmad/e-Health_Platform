import {Injectable} from '@angular/core';
import {GenericFirestoreCRUD} from "../../../core/services/generic-firestore.service";
import {DispensaryEvent} from "../models/events";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class EventsService extends GenericFirestoreCRUD<DispensaryEvent>{
  constructor(private db: AngularFirestore) {
    super('/events', db);
  }


}
