import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";

@Component({
  selector: 'app-med-card',
  templateUrl: './med-card.component.html',
  styleUrls: ['./med-card.component.css']
})
export class MedCardComponent implements OnInit {
  @Input() medItem!: MedItem;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.medItem = {
      id: "cndskl",
      brandName: "Panadol",
      description: "jkdhsvlv dofoidjs vdnfjkvn fdkjsbfjkshd sjgrosenjgiuoerhsjgkes gvjfdpvjeso bhjes jvfdsjvlfkdh bfis",
      dosage: "10mg",
      requiresPrescription: false,
      quantity: 10,
      price: 5,
      medClass: "Fever reducer",
      medForm: "Pill"
    }
  }

  public triggerSelected(): void {
    this.selected.emit(this.medItem.id);
  }

  public getPrescription() {
    return (this.medItem.requiresPrescription)? "Prescription needed": "Over the counter";
  }

  public getAvailability() {
    return (this.medItem.quantity)? "Available": "Not available";
  }
}
