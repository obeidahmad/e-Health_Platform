import { Component, OnInit } from '@angular/core';
import {ModuleControlService} from "../../../../domain/admin/services/module-control.service";
import {ContainerStatus} from "../../../../domain/admin/models/containers";
import {switchMap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-module-control',
  templateUrl: './module-control.component.html',
  styleUrls: ['./module-control.component.css']
})
export class ModuleControlComponent implements OnInit {
  public containers: ContainerStatus[] = [];
  constructor(public _moduleService: ModuleControlService,
              private _nzMessage: NzMessageService) { }

  ngOnInit(): void {
    this._moduleService.getAllStatus().subscribe(res=>this.containers=res)
  }

  toggle(item: ContainerStatus) {
    console.log("boi")
    this._nzMessage.info("Stopping container...")

    if (item.status == 'running') {
      console.log("stopping")
      this._moduleService.stopContainer(item.name)
        .subscribe(_ =>{
          this._moduleService.getAllStatus().subscribe(res=>this.containers=res)
        })
    } else {
      console.log("started")

      this._moduleService.startContainer(item.name)
        .subscribe(_ =>{
          this._nzMessage.info("Starting container...")

          this._moduleService.getAllStatus().subscribe(res=>this.containers=res)
        })
    }

  }
}
