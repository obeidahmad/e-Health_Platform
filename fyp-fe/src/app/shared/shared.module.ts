import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TagComponent} from './components/tag/tag.component';
import {ShellComponent} from './components/shell/shell.component';
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import { GoogleBtnComponent } from './components/google-btn/google-btn.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPopoverModule} from "ng-zorro-antd/popover";


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
        NgOptimizedImage,
        NzMenuModule,
        RouterLinkWithHref,
        NzAvatarModule,
        NzIconModule,
        NzPopoverModule
    ]
})
export class SharedModule {
}
