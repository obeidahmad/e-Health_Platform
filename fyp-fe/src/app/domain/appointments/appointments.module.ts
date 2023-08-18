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


@NgModule({
  declarations: [
    AppointmentsViewComponent,
    CalendarComponent,
    PatientViewComponent,
    SetAvailabilityComponent
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
    FullCalendarModule
  ]
})
export class AppointmentsModule {
}
