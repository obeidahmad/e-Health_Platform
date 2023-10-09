import {Component, Input, OnInit} from '@angular/core';
import {EventStructure} from "../../../../domain/admin/models/events";

@Component({
  selector: 'app-title-chunk',
  templateUrl: './title-chunk.component.html',
  styleUrls: ['./title-chunk.component.css']
})
export class TitleChunkComponent implements OnInit {
  @Input() eventStructure!: EventStructure;

  constructor() { }

  ngOnInit(): void {
  }

}
