import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-google-btn',
  templateUrl: './google-btn.component.html',
  styleUrls: ['./google-btn.component.css']
})
export class GoogleBtnComponent implements OnInit {
  @Output() google: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public btnClicked() {
    this.google.emit();
  }
}
