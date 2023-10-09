import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {GenericFirestoreCRUD} from "../../../core/services/generic-firestore.service";
import {Staff} from "../models/users";

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService extends GenericFirestoreCRUD<Staff> {


  constructor(private db: AngularFirestore) {
    super('/users', db);
  }

}
