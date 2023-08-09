import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreRoutes} from "./core-routes";
import {IsLoggedInGuard} from "./guards/is-logged-in.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: CoreRoutes.AUTH,
    pathMatch: 'full'
  },
  {
    path: CoreRoutes.MEDS,
    loadChildren: () => import('../domain/meds/meds.module').then(m => m.MedsModule),
    data: {
      breadcrumb: 'Pharmacy'
    }
  },
  {
    path: CoreRoutes.AUTH,
    loadChildren: () => import('../domain/authentication/auth.module').then(m => m.AuthModule),
    // canActivate: [IsLoggedInGuard]
  },
  {
    path: CoreRoutes.APPT,
    loadChildren: () => import('../domain/appointments/appointments.module').then(m => m.AppointmentsModule),
    data: {
      breadcrumb: 'Appointments'
    }
  },
  {
    path: CoreRoutes.ADMIN,
    loadChildren: () => import('../domain/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: CoreRoutes.AUTH
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
