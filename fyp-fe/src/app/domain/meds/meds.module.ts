import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedsRoutingModule} from './meds-routing.module';
import {MedsViewComponent} from '../../features/meds/meds-view.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzButtonModule} from "ng-zorro-antd/button";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ViewAllComponent} from '../../features/meds/pages/view-all/view-all.component';
import {MedCardComponent} from '../../features/meds/components/med-card/med-card.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {BookmarkedComponent} from '../../features/meds/components/bookmarked/bookmarked.component';
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {SharedModule} from "../../shared/shared.module";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {SearchComponent} from '../../features/meds/components/search/search.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {MedDetailComponent} from '../../features/meds/pages/med-detail/med-detail.component';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {CreateMedFormComponent} from '../../features/meds/pages/create-med-form/create-med-form.component';
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzEmptyModule} from "ng-zorro-antd/empty";


@NgModule({
  declarations: [
    MedsViewComponent,
    ViewAllComponent,
    MedCardComponent,
    BookmarkedComponent,
    SearchComponent,
    MedDetailComponent,
    CreateMedFormComponent
  ],
  imports: [
    CommonModule,
    MedsRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzImageModule,
    NzWaveModule,
    NzButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzGridModule,
    NzBadgeModule,
    NzDropDownModule,
    NzDividerModule,
    NzToolTipModule,
    SharedModule,
    NzTagModule,
    NzPaginationModule,
    NzInputModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzSelectModule,
    NzFormModule,
    NzSliderModule,
    NzSwitchModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzMessageModule,
    NzEmptyModule
  ]
})
export class MedsModule {
}
