import {Component, OnInit} from '@angular/core';
import {CoreRoutes} from "../../core/core-routes";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {MedItem} from "../../domain/meds/models/med-item";

@Component({
  selector: 'app-meds-view',
  templateUrl: './meds-view.component.html',
  styleUrls: ['./meds-view.component.css']
})
export class MedsViewComponent implements OnInit {
  public drawerSettings: { visible: boolean } = {
    visible: false
  };

  public purshasedMeds: Observable<MedItem[]>= of([]);

  constructor(private _router: Router) {

  }

  ngOnInit(): void {
  }


  public openPurchaseDrawer() {
    this.drawerSettings.visible = true;
  }

  public close() {
    this.drawerSettings.visible = false;

  }

  navigateToMed($event: string) {
    this._router.navigate([CoreRoutes.MEDS, $event])
  }
}
