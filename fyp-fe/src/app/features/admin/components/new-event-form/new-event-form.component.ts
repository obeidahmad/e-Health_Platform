import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventStructure} from "../../../../domain/admin/models/events";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {FireUploadEventsService} from "../../../../domain/admin/services/fire-upload.service";

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit {
  @Output() extraSection: EventEmitter<EventStructure> = new EventEmitter<EventStructure>();
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'select',
      defaultValue: 'title',
      props: {
        label: 'Select Type',
        placeholder: 'Title',
        required: true,
        options: [
          {value: "image", label: "Image"},
          {value: "image-with-caption", label: "Image with Caption"},
          {value: "paragraph", label: "Paragraph"},
          {value: "title", label: "Title"}
        ],
      },
    },
    {
      key: 'title',
      type: 'input',
      props: {
        required: true,
        label: 'Title',
      },
      expressions: {
        hide: "!(model.type == 'paragraph')",
      },
    },
    {
      key: 'content',
      type: 'textarea',
      props: {
        required: true,
        label: 'Content',
      },
      expressions: {
        hide: "!(model.type !== 'image')",
      },
    },
    {
      key: 'src',
      type: 'dragUpload',
      props: {
        required: true,
        label: 'Image',
      },
      expressions: {
        hide: "!(model.type == 'image' || model.type == 'image-with-caption')",
      },
    },

  ]

  constructor(private _fileUploadService: FireUploadEventsService) {
  }

  ngOnInit(): void {

  }

  submit() {
    if(this.form.valid)
      this.extraSection.emit(this.model)
  }
}
