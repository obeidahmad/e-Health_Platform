import { Component, OnInit } from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";
import {Router} from "@angular/router";

@Component({
  selector: 'app-med-detail',
  templateUrl: './med-detail.component.html',
  styleUrls: ['./med-detail.component.css']
})
export class MedDetailComponent implements OnInit {
  public medItem!: MedItem;
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.medItem = {
      id: "cndskl",
      brandName: "Panadol",
      description: "jkdhsvlv dofoidjs vdnfjkvn fdkjsbfjkshd sjgrosenjgiuoerhsjgkes gvjfdpvjeso bhjes jvfdsjvlfkdh bfis",
      dosage: "10mg",
      requiresPrescription: true,
      quantity: 10,
      price: 5,
      medClass: "Fever reducer",
      medForm: "Pill"
    }
  }

  public getAvailability() {
    return (this.medItem.quantity)? "Available": "Not available";
  }

}
