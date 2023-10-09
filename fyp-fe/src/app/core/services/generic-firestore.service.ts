import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {DispensaryEvent} from "../../domain/admin/models/events";

export abstract class GenericFirestoreCRUD<BodyT> {

  eventsRef!: AngularFirestoreCollection<BodyT>;

  protected constructor(dbPath: string, db: AngularFirestore) {
    this.eventsRef = db.collection(dbPath);
  }

  public getAll(): AngularFirestoreCollection<BodyT> {
    return this.eventsRef;
  }



  public create(tutorial: BodyT): any {
    return this.eventsRef.add({ ...tutorial });
  }

  public update(id: string, data: any): Promise<void> {
    return this.eventsRef.doc(id).update(data);
  }

  public delete(id: string): Promise<void> {
    return this.eventsRef.doc(id).delete();
  }

}
