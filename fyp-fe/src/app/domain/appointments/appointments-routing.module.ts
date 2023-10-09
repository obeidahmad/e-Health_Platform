import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentsViewComponent} from "../../features/appointments/appointments-view.component";
import {PatientViewComponent} from "../../features/appointments/pages/patient-view/patient-view.component";
import {SetAvailabilityComponent} from "../../features/appointments/pages/set-availability/set-availability.component";
import {RoleGuardGuard} from "../../core/guards/role-guard.guard";
import {DrViewComponent} from "../../features/appointments/pages/dr-view/dr-view.component";
import {DrDashboardComponent} from "../../features/appointments/pages/dr-dashboard/dr-dashboard.component";
import {
  PatientAppointmentsCalendarComponent
} from "../../features/appointments/components/patient-appointments-calendar/patient-appointments-calendar.component";

const routes: Routes = [{
  path: '',
  component: AppointmentsViewComponent,
  children: [
    {
      path: 'patient',
      component: PatientViewComponent,
      children: [{
        path: '',
        component: PatientAppointmentsCalendarComponent

      }]
    },
    {
      path: 'doctor',
      component: DrViewComponent,
      // canActivate: [RoleGuardGuard],
      // data: {role: "doctor"},
      children: [
        {
          path: '',
          component: DrDashboardComponent
        },
        {
          path: 'set_availability',
          component: SetAvailabilityComponent,
          data: {
            breadcrumb: 'Set Availability'
          }
        },
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {
}
