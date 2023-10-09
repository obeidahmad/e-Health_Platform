import {Component, OnInit} from '@angular/core';
import {CoreRoutes} from "../../core/core-routes";
import {Router} from "@angular/router";
import {MedsService} from "../../domain/meds/services/meds.service";
import {Purchase} from "../../domain/meds/models/purchase";
import {AuthService} from "../../domain/authentication/services/auth.service";

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
  role!: string;

  constructor(private _router: Router,
              private _authService: AuthService,
              private medsService: MedsService) {

  }

  ngOnInit(): void {
    this.role = this._authService.getCurrentUserRole();
    if (this.role == 'patient')
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
