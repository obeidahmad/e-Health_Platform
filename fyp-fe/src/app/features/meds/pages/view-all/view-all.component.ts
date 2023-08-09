import {Component, OnInit} from '@angular/core';
import {MedsService} from "../../../../domain/meds/services/meds.service";
import {Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";
import {MedItem} from "../../../../domain/meds/models/med-item";
import {MedsQuerySettings} from "../../../../domain/meds/models/meds-query-settings";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  public meds: MedItem[] = [];
  public searchAndFilterSettings: MedsQuerySettings = {
    pageNumber: 1,
    pageSize: 12
  }

  constructor(private _medsService: MedsService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._medsService.getAllByUser(this.searchAndFilterSettings).subscribe(res => this.meds = res);
  }

  navigateToMed($event: string) {
    this._router.navigate([CoreRoutes.MEDS, $event])
  }
}
