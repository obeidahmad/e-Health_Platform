import { Component, OnInit } from '@angular/core';
import {CoreRoutes} from "../../../core/core-routes";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor() {

  }

  patientRoutes = [
    {
      name: "Medicines",
      route: CoreRoutes.MEDS
    },

  ]

  ngOnInit(): void {
  }

}
