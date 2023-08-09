import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TagComponent} from './components/tag/tag.component';
import {ShellComponent} from './components/shell/shell.component';
import {RouterOutlet} from "@angular/router";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import { GoogleBtnComponent } from './components/google-btn/google-btn.component';


@NgModule({
  declarations: [
    TagComponent,
    ShellComponent,
    GoogleBtnComponent
  ],
  exports: [
    TagComponent,
    ShellComponent,
    GoogleBtnComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        NzImageModule,
        NzLayoutModule,
        NzGridModule,
        NzButtonModule,
        NzBreadCrumbModule,
        NgOptimizedImage
    ]
})
export class SharedModule {
}
