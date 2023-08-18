import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from "../../features/admin/pages/events/events.component";
import {AdminRoutes} from "./admin-routes";
import {AdminViewComponent} from "../../features/admin/admin-view.component";

const routes: Routes = [
  {
    path: '',
    component: AdminViewComponent,
    children: [
      {
        path: '',
        redirectTo: AdminRoutes.NEW_EVENTS,
        pathMatch: 'full'
      },
      {
        path: AdminRoutes.NEW_EVENTS,
        component: EventsComponent,
        data: {
          breadcrumb: 'Events'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
