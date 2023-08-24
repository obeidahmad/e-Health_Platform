import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentsRoutingModule} from './appointments-routing.module';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {SharedModule} from "../../shared/shared.module";
import {AppointmentsViewComponent} from "../../features/appointments/appointments-view.component";
import { CalendarComponent } from '../../features/appointments/components/calendar/calendar.component';
import { PatientViewComponent } from '../../features/appointments/pages/patient-view/patient-view.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { SetAvailabilityComponent } from '../../features/appointments/pages/set-availability/set-availability.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {FormsModule} from "@angular/forms";
import {NzTableModule} from "ng-zorro-antd/table";
import { ApptCardComponent } from '../../features/appointments/components/appt-card/appt-card.component';
import { DrViewComponent } from '../../features/appointments/pages/dr-view/dr-view.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";


@NgModule({
  declarations: [
    AppointmentsViewComponent,
    CalendarComponent,
    PatientViewComponent,
    SetAvailabilityComponent,
    ApptCardComponent,
    DrViewComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    NzLayoutModule,
    NzImageModule,
    NzGridModule,
    NzButtonModule,
    NzBreadCrumbModule,
    SharedModule,
    FullCalendarModule,
    NzTabsModule,
    NzDatePickerModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    NzSkeletonModule,
    NzDividerModule,
    NzModalModule,
    NzMessageModule,
    NzCheckboxModule
  ]
})
export class AppointmentsModule {
}
