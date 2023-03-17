import {Component, Input, OnInit} from '@angular/core';
import {TagType} from "../models/tag-type";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() type!: TagType;
  @Input() content!: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
