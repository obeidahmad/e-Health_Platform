import {Component, Input, OnInit} from '@angular/core';
import {EventStructure} from "../../../../domain/admin/models/events";

@Component({
  selector: 'app-image-chunk',
  templateUrl: './image-chunk.component.html',
  styleUrls: ['./image-chunk.component.css']
})
export class ImageChunkComponent implements OnInit {
  @Input() eventStructure!: EventStructure;

  constructor() { }

  ngOnInit(): void {
  }

}
