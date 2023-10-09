import {Component, OnInit} from '@angular/core';
import {FieldType, FormlyConfig} from "@ngx-formly/core";
import {NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs, UploadFilter} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {FireUploadEventsService} from "../../../../domain/admin/services/fire-upload.service";
import {FileUpload} from "../../models/file-upload";

@Component({
  selector: 'app-custom-file-input',
  templateUrl: './custom-file-input.component.html',
  styleUrls: ['./custom-file-input.component.css']
})
export class CustomFileInputComponent extends FieldType implements OnInit {
  private readonly ALLOWED_UPLOADS = ['image/jpeg',
    'image/png'];

  public filterUploads: UploadFilter[] = [
    {
      name: 'get-type',
      fn: (fileList: NzUploadFile[]) => {
        // since only one file can be uploaded at a time checking the first is enough
        if (!this.ALLOWED_UPLOADS.includes(fileList[0]?.type || '')) {
          this._nzMessage.error('Only image files are allowed.');
        }
        return fileList.filter(file => this.ALLOWED_UPLOADS.includes(file.type || ''));
      }
    }
  ];

  constructor(private formlyConfig: FormlyConfig,
              private _nzMessage: NzMessageService,

              private _fireUpload: FireUploadEventsService) {
    super();

  }

  ngOnInit(): void {
  }
  public uploadImage = (toUpload: NzUploadXHRArgs) => {
    // @ts-ignore
    const uploaded = new FileUpload(toUpload.file);
    const action= (this.props['med'])? this._fireUpload.pushMedicineToStorage(uploaded)
      : this._fireUpload.pushFileToStorage(uploaded);
    return action
      .subscribe({
        next: (downloadURL) => {
          uploaded.url = downloadURL;
          console.log(downloadURL)
          this.formControl.setValue(uploaded.url)
        },
        error: () => {
          this._nzMessage.error("Could not upload")
        },
        complete: () => this._nzMessage.info('Uploaded')
      })

  };

}
