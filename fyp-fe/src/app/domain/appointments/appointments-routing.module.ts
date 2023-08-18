import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentsViewComponent} from "../../features/appointments/appointments-view.component";
import {PatientViewComponent} from "../../features/appointments/pages/patient-view/patient-view.component";
import {SetAvailabilityComponent} from "../../features/appointments/pages/set-availability/set-availability.component";
import {RoleGuardGuard} from "../../core/guards/role-guard.guard";

const routes: Routes = [{
  path: '',
  component: AppointmentsViewComponent,
  children: [
    {
      path: '',
      component: PatientViewComponent
    },
    {
      path: 'set_availability',
      component: SetAvailabilityComponent,
      canActivate: [RoleGuardGuard],
      data: {role: "doctor"}
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {
}
