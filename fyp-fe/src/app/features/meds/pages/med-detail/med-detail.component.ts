import {Component, OnInit} from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";
import {ActivatedRoute} from "@angular/router";
import {MedsService} from "../../../../domain/meds/services/meds.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Purchase} from "../../../../domain/meds/models/purchase";

@Component({
  selector: 'app-med-detail',
  templateUrl: './med-detail.component.html',
  styleUrls: ['./med-detail.component.css']
})
export class MedDetailComponent implements OnInit {
  public medItem!: MedItem;
  public loading: boolean = true;
  private medId!: string;
  public purchaseStatus: "new" | "bought" | "reserved" = "new";
  private purchase!: Purchase;

  constructor(private _route: ActivatedRoute,
              private _nzMessage: NzMessageService,
              private _medService: MedsService) {
    this._route.params.subscribe(params => {
      this.medId = params['id'];
    })
  }

  ngOnInit(): void {
    this._medService.getMedById(this.medId).subscribe({
      next: (res) => {
        this.medItem = res;
        this._medService.getUserPurchases().subscribe({
          next: (purchases) => {
            console.log(purchases)
            const match = purchases.find(p => p.medicine.id == res.id);
            if (match) {
              this.purchaseStatus = match.status;
              this.purchase = match;
            }
            this.loading = false;
          }
        })
      }
    });
  }

  public getAvailability() {
    return (this.medItem.quantity) ? "Available" : "Not available";
  }

  getBookmarked() {
    return (this.medItem.isBookmarked) ? "fill" : "outline";
  }

  toggleBookmark() {
    if (!this.medItem.isBookmarked) {
      this._medService.bookmarkMeds([this.medItem.id])
        .subscribe({
          next: value => {
            this._nzMessage.info("Bookmarked")
            this.medItem.isBookmarked = true;
          }
        })
    } else {
      this._medService.unBookmarkMeds([this.medItem.id])
        .subscribe({
          next: value => {
            this._nzMessage.info("UnBookmarked")
            this.medItem.isBookmarked = false;
          }
        })
    }
  }

  reserveMed() {
    this._medService.reserveMed(this.medItem.id)
      .subscribe({
        next: () => {
          this._nzMessage.info("Reserved");
          this.purchaseStatus = 'reserved';
        }
      });
  }

  unReserveMed() {
    if (!this.purchase){
      this._nzMessage.warning("Cannot remove, check with admin");
      return;
    }
    console.log(this.purchase.id)
    this._medService.unReserveMed(this.purchase.id)
      .subscribe({
        next: () => {
          this._nzMessage.info("Reservation removed.");
          this.purchaseStatus = 'new';
        }
      });
  }
}
