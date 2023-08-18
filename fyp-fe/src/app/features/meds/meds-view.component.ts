import {Component, OnInit} from '@angular/core';
import {CoreRoutes} from "../../core/core-routes";
import {Router} from "@angular/router";
import {MedsService} from "../../domain/meds/services/meds.service";
import {Purchase} from "../../domain/meds/models/purchase";

@Component({
  selector: 'app-meds-view',
  templateUrl: './meds-view.component.html',
  styleUrls: ['./meds-view.component.css']
})
export class MedsViewComponent implements OnInit {
  public loading: boolean = false;
  public drawerSettings: { visible: boolean } = {
    visible: false
  };

  public purchasedMeds: Purchase[] = [];

  constructor(private _router: Router,
              private medsService: MedsService) {

  }

  ngOnInit(): void {
    this.medsService.getUserPurchases().subscribe({

      next: res => this.purchasedMeds = res
    })

  }


  public openPurchaseDrawer() {
    this.medsService.getUserPurchases().subscribe({
      next: res => {
        this.purchasedMeds = res;
        this.drawerSettings.visible = true;

      }

    })
  }

  public close() {
    this.drawerSettings.visible = false;

  }

  navigateToMed($event: string) {
    this._router.navigate([CoreRoutes.MEDS, $event])
  }
}
