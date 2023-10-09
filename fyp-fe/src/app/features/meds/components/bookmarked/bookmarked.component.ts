import {Component, OnInit} from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";
import {MedsService} from "../../../../domain/meds/services/meds.service";

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.css']
})
export class BookmarkedComponent implements OnInit {
  public meds: MedItem[] = [];

  constructor(private _medsService: MedsService) {
  }

  ngOnInit(): void {
    this._medsService
      .getBookmarked()
      .subscribe({
        next: (meds) => {
          console.log('bookmarks')
          console.log(meds)
          this.meds = meds
        }
      })
  }

  toggleViewDropDown($event: boolean) {
    if ($event) {
      this._medsService.getBookmarked()
        .subscribe({
          next: (meds) => this.meds = meds
        })
    }
  }
}
