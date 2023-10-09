import { Injectable } from '@angular/core';
import {GenericFirestoreCRUD} from "../../../core/services/generic-firestore.service";
import {Patient, Staff} from "../models/users";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PatientsServiceService extends GenericFirestoreCRUD<Patient> {


  constructor(private db: AngularFirestore) {
    super('/patients', db);
  }

}
