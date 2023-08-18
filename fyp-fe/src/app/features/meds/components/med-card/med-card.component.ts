import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";

@Component({
  selector: 'app-med-card',
  templateUrl: './med-card.component.html',
  styleUrls: ['./med-card.component.css']
})
export class MedCardComponent implements OnInit {
  @Input() medItem!: MedItem;
  @Input() minimal: boolean = false;
  @Input() purchaseDate!: string;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  getDate() {
    return new Date(this.purchaseDate).toLocaleDateString('en-us', {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }
  constructor() {
  }

  ngOnInit(): void {

  }

  toggleBookmark() {

  }

  getBookmarked() {
    return (this.medItem.isBookmarked) ? "fill" : "outline";
  }

  public triggerSelected(): void {
    this.selected.emit(this.medItem.id);
  }

  public getPrescription() {
    return (this.medItem.requiresPrescription) ? "Prescription needed" : "Over the counter";
  }

  public getAvailability() {
    return (this.medItem.quantity) ? "Available" : "Not available";
  }

  protected readonly Date = Date;
}
