import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MedsService} from "../../../../domain/meds/services/meds.service";
import {MedItem} from "../../../../domain/meds/models/med-item";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {map} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-med-form',
  templateUrl: './create-med-form.component.html',
  styleUrls: ['./create-med-form.component.css']
})
export class CreateMedFormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'brandName',
      type: 'input',
      props: {
        required: true,
        label: 'Brand name',
      },
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        required: true,
        label: 'Description',
      },
    },
    {
      key: 'dosage',
      type: 'input',
      props: {
        required: true,
        label: 'Dosage',
      },
    },
    {
      key: 'quantity',
      type: 'input',
      props: {
        type: 'number',
        required: true,
        label: 'Quantity',
      },
    },
    {
      key: 'price',
      type: 'input',
      props: {
        type: 'number',
        required: true,
        label: 'Price',
      },
    },
    {
      key: 'requiresPrescription',
      type: 'checkbox',
      props: {
        pattern: 'true',
        required: true,
        label: 'Requires Prescription',
      },
    },
    {
      key: 'medForm',
      type: 'select',
      props: {
        label: 'Medicine Form',
        required: true,
        options: this._medService.getMedForms()
          .pipe(map(classes => {
            return classes.map(c => {
              return {value: c, label: c}
            })
          })),
      },
    },
    {
      key: 'medClass',
      type: 'select',
      props: {
        label: 'Medicine Class',
        required: true,
        options: this._medService.getMedClasses()
          .pipe(map(classes => {
            return classes.map(c => {
              return {value: c, label: c}
            })
          })),
        // valueProp: 'id',
        // labelProp: 'name',
      },
    },
    {
      key: 'imageUrl',
      type: 'dragUpload',
      props: {
        label: "Image",
        med: true
      }
    }
  ];
  private medId!: string;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _nzMessage: NzMessageService,
              private _medService: MedsService) {
// @ts-ignore
    const medId = this._router.getCurrentNavigation().extras?.state?.medId;

    this.medId = medId;
  }


  submit() {
    if(!this.medId){
      this._medService.createMed(this.model)
        .subscribe({
          next: value => {this._router.navigate([CoreRoutes.MEDS])},
          error: (err) => {
            this._nzMessage.error(err)
          }
        })
    } else {
      this.model.medId = this.model.id;
      this._medService.updateMed(this.model)
        .subscribe({
        next: value => {this._router.navigate([CoreRoutes.MEDS, this.medId])},
        error: (err) => {
          this._nzMessage.error(err)
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.medId)
      this._medService.getMedById(this.medId).subscribe({
        next: (res) => {
          this.model = res;
        }
      })


  }

}
