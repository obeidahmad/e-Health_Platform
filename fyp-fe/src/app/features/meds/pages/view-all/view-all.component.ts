import {Component, OnInit} from '@angular/core';
import {MedsService} from "../../../../domain/meds/services/meds.service";
import {Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";
import {MedItem} from "../../../../domain/meds/models/med-item";
import {MedsQuerySettings} from "../../../../domain/meds/models/meds-query-settings";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {MedRoutes} from "../../../../domain/med-routes";
import * as events from "events";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  public meds: MedItem[] = [];
  public searchAndFilterSettings: MedsQuerySettings = {
    pageNumber: 1,
    pageSize: 9
  }
  public numberOfPages: number = 0;

  constructor(private _medsService: MedsService,
              private _authService: AuthService,
              private _router: Router) {
  }
  role!: string;


  ngOnInit(): void {
    this.role = this._authService.getCurrentUserRole();
    this.getAll();
  }

  navigateToMed($event: string) {
    this._router.navigate([CoreRoutes.MEDS, $event])
  }

  changePage($event: any) {
    this.searchAndFilterSettings.pageNumber = $event;
    this.getAll();
  }

  private getAll() {
    if (this.role == 'patient') {
      this._medsService.getAllByUser(this.searchAndFilterSettings)
        .subscribe(res => {
          this.meds = res.data
          this.numberOfPages = res.numberOfPages;
        });
    }else {
      this._medsService.getAll(this.searchAndFilterSettings)
        .subscribe(res => {
          console.log(res)
          this.meds = res.data
          this.numberOfPages = res.numberOfPages;
          console.log(this.numberOfPages)
        });
    }
  }

  addNewForm() {
    this._router.navigate([CoreRoutes.MEDS, MedRoutes.CREATE]);
  }

  updateMeds($event: MedsQuerySettings) {
    this.searchAndFilterSettings = {
      ...$event,
    }
    this.getAll();
  }

  toggleBookmark($event: MedItem) {
   this._medsService.bookmarkMeds([$event.id]).subscribe();
  }
}
