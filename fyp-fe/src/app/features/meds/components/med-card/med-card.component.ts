import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";
import {b} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-med-card',
  templateUrl: './med-card.component.html',
  styleUrls: ['./med-card.component.css']
})
export class MedCardComponent implements OnInit {
  @Input() medItem!: MedItem;
  @Input() minimal: boolean = false;
  @Input() purchaseDate!: string;
  @Input() status!: string;
  @Input() role!: string;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();
  @Output() bookmarked: EventEmitter<MedItem> = new EventEmitter<MedItem>();

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

  toggleBookmark($event: MouseEvent) {
    $event.stopPropagation();
    this.medItem.isBookmarked = !this.medItem.isBookmarked;
    this.bookmarked.emit(this.medItem);
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
