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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import { EventsListComponent } from '../../features/admin/components/events-list/events-list.component';
import {ModuleControlComponent} from "../../features/admin/pages/module-control/module-control.component";
import { NewUserComponent } from '../../features/admin/pages/new-user/new-user.component';
import {FormlyModule} from "@ngx-formly/core";
import { UsersComponent } from '../../features/admin/pages/users/users.component';
import { UsersListComponent } from '../../features/admin/components/users-list/users-list.component';
import { NewEventFormComponent } from '../../features/admin/components/new-event-form/new-event-form.component';
import { CustomFileInputComponent } from '../../features/admin/components/custom-file-input/custom-file-input.component';
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzBadgeModule} from "ng-zorro-antd/badge";

@NgModule({
  declarations: [
    EventsComponent,
    AdminViewComponent,
    ImageChunkComponent,
    ParagraphChunkComponent,
    ParagraphWithTitleChunkComponent,
    TitleChunkComponent,
    ImageWithCaptionChunkComponent,
    EventEditorComponent,
    ModuleControlComponent,
    EventsListComponent,
    NewUserComponent,
    UsersComponent,
    UsersListComponent,
    NewEventFormComponent,
    CustomFileInputComponent,
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
    NzIconModule,
    NzImageModule,
    NzListModule,
    NzTagModule,
    NzMessageModule,
    NzRadioModule,
    NzCollapseModule,
    NzSkeletonModule,
    NzEmptyModule,
    FormlyModule.forChild(),
    ReactiveFormsModule,
    NzUploadModule,
    NzProgressModule,
    DragDropModule,
    NzDividerModule,
    NzTabsModule,
    NzDescriptionsModule,
    NzBadgeModule,
  ]
})
export class AdminModule {
}
