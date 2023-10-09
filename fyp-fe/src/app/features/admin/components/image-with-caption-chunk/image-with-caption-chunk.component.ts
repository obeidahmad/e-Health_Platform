import {Component, Input, OnInit} from '@angular/core';
import {EventStructure} from "../../../../domain/admin/models/events";

@Component({
  selector: 'app-image-with-caption-chunk',
  templateUrl: './image-with-caption-chunk.component.html',
  styleUrls: ['./image-with-caption-chunk.component.css']
})
export class ImageWithCaptionChunkComponent implements OnInit {
  @Input() eventStructure!: EventStructure;

  constructor() { }

  ngOnInit(): void {
  }

}
