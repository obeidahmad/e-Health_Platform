import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreRoutes} from "./core-routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: CoreRoutes.AUTH,
    pathMatch: 'full'
  },
  { path: CoreRoutes.MEDS,
    loadChildren: () => import('../domain/meds/meds.module').then(m => m.MedsModule),
    data: {
      breadcrumb: 'Pharmacy'
    }
  },
  {
    path: CoreRoutes.AUTH,
    loadChildren: () => import('../domain/authentication/auth.module').then(m => m.AuthModule)
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
