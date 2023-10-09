import {Component, OnInit} from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";
import {ActivatedRoute, Router} from "@angular/router";
import {MedsService} from "../../../../domain/meds/services/meds.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Purchase} from "../../../../domain/meds/models/purchase";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {CoreRoutes} from "../../../../core/core-routes";
import {MedRoutes} from "../../../../domain/med-routes";

@Component({
  selector: 'app-med-detail',
  templateUrl: './med-detail.component.html',
  styleUrls: ['./med-detail.component.css']
})
export class MedDetailComponent implements OnInit {
  public medItem!: MedItem;
  public loading: boolean = true;
  public purchaseStatus: "new" | "bought" | "reserved" = "new";
  public role!: string;
  private medId!: string;
  private purchase!: Purchase;
  public medHistory: Purchase[] = [];
  // drawerSettings = {
  //   visible: false
  // };

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _nzMessage: NzMessageService,
              private _authService: AuthService,
              private _medService: MedsService) {
    this._route.params.subscribe(params => {
      this.medId = params['id'];
    })
    this.role = _authService.getCurrentUserRole();
  }

  ngOnInit(): void {
    this._medService.getMedById(this.medId).subscribe({
      next: (res) => {
        this.medItem = res;
        if (this.role == 'patient') {
          this._medService.getUserPurchases().subscribe({
            next: (purchases) => {

              const match = purchases.find(p => p.medicine.id == res.id);
              if (match) {
                this.purchaseStatus = match.status;
                this.purchase = match;
              }
            }
          })
        } else if (this.role == 'nurse'){
          this._medService.getMedicinePurchaseHistory(this.medItem.id).subscribe({
            next: (purchases) => {
              this.medHistory = purchases;
              console.log(this.medHistory)
            }
          })
        }
      },
      complete: () => this.loading =false
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
    if (!this.purchase) {
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


  markPurchased(item: Purchase) {
    this._medService.buyMedicine(this.medItem.id, item.user.id).subscribe();

  }

  delete() {
    this._medService.deleteMed(this.medId).subscribe({
      next: () => this._router.navigate([CoreRoutes.MEDS])
    });

  }

  edit() {
    this._router.navigate([CoreRoutes.MEDS, MedRoutes.CREATE, this.medId], {state: {medId: this.medId}})
  }
}
