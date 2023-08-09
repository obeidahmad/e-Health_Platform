import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {EventsComponent} from "../../features/admin/pages/events/events.component";
import {AdminViewComponent} from "../../features/admin/admin-view.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzGridModule} from "ng-zorro-antd/grid";
import {SharedModule} from "../../shared/shared.module";
import { ImageChunkComponent } from '../../features/admin/components/image-chunk/image-chunk.component';
import { ParagraphChunkComponent } from '../../features/admin/components/paragraph-chunk/paragraph-chunk.component';
import { ParagraphWithTitleChunkComponent } from '../../features/admin/components/paragraph-with-title-chunk/paragraph-with-title-chunk.component';
import { TitleChunkComponent } from '../../features/admin/components/title-chunk/title-chunk.component';
import { ImageWithCaptionChunkComponent } from '../../features/admin/components/image-with-caption-chunk/image-with-caption-chunk.component';
import {EventEditorComponent} from "../../features/admin/components/event-editor/event-editor.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [
    EventsComponent,
    AdminViewComponent,
    ImageChunkComponent,
    ParagraphChunkComponent,
    ParagraphWithTitleChunkComponent,
    TitleChunkComponent,
    ImageWithCaptionChunkComponent,
    EventEditorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzButtonModule,
    NzDrawerModule,
    NzGridModule,
    SharedModule,
    NzInputModule,
    FormsModule,
    NzDatePickerModule,
    NzCardModule,
    NzIconModule
  ]
})
export class AdminModule {
}
