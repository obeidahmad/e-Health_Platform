import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-availability',
  templateUrl: './set-availability.component.html',
  styleUrls: ['./set-availability.component.css']
})
export class SetAvailabilityComponent implements OnInit {
  doctorTimeSlot: number = 15; // TODO
  constructor() { }

  ngOnInit(): void {
  }

}
