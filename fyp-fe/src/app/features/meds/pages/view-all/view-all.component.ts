import {Component, OnInit} from '@angular/core';
import {MedsService} from "../../../../domain/meds/services/meds.service";
import {Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  meds = [1, 2, 3, 4, 5, 6, 2, 2, 4, 34];

  constructor(private _medsService: MedsService,
              private _router: Router) {
  }

  ngOnInit(): void {

  }

  navigateToMed($event: string) {
    this._router.navigate([CoreRoutes.MEDS, $event])
  }
}
