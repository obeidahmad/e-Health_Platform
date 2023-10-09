import {Component, Input, OnInit} from '@angular/core';
import {EventStructure} from "../../../../domain/admin/models/events";

@Component({
  selector: 'app-paragraph-chunk',
  templateUrl: './paragraph-chunk.component.html',
  styleUrls: ['./paragraph-chunk.component.css']
})
export class ParagraphChunkComponent implements OnInit {
  @Input() eventStructure!: EventStructure;

  constructor() {
  }

  ngOnInit(): void {
  }

}
