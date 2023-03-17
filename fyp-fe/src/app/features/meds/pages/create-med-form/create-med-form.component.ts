import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-med-form',
  templateUrl: './create-med-form.component.html',
  styleUrls: ['./create-med-form.component.css']
})
export class CreateMedFormComponent implements OnInit {
  public form!: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      brandName: [undefined, [Validators.required]],
      dosage: [undefined, [Validators.required]],
      medClass: [undefined, [Validators.required]],
      medForm: [undefined, [Validators.required]],
      description: [undefined, ],

    });
  }

}
