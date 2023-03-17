import {Component, OnInit} from '@angular/core';
import {MedItem} from "../../../../domain/meds/models/med-item";

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.css']
})
export class BookmarkedComponent implements OnInit {
  public meds: MedItem[] = [];
  constructor() {
  }

  ngOnInit(): void {
    this.meds = [
      {
        id: "cndskl",
        brandName: "Panadol",
        description: "jkdhsvlv dofoidjs vdnfjkvn fdkjsbfjkshd sjgrosenjgiuoerhsjgkes gvjfdpvjeso bhjes jvfdsjvlfkdh bfis",
        dosage: "10mg",
        requiresPrescription: false,
        quantity: 10,
        price: 5,
        medClass: "Fever reducer",
        medForm: "Pill"
      },
      {
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
    ]
  }

}
