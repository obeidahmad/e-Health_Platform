import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from "../../features/admin/pages/events/events.component";
import {AdminRoutes} from "./admin-routes";
import {AdminViewComponent} from "../../features/admin/admin-view.component";
import {EventEditorComponent} from "../../features/admin/components/event-editor/event-editor.component";
import {EventsListComponent} from "../../features/admin/components/events-list/events-list.component";
import {ModuleControlComponent} from "../../features/admin/pages/module-control/module-control.component";
import {UsersComponent} from "../../features/admin/pages/users/users.component";
import {UsersListComponent} from "../../features/admin/components/users-list/users-list.component";
import {NewUserComponent} from "../../features/admin/pages/new-user/new-user.component";

const routes: Routes = [
  {
    path: '',
    component: AdminViewComponent,
    children: [
      {
        path: '',
        redirectTo: AdminRoutes.MODULE_CONTROL,
        pathMatch: 'full'
      },
      {
        path: AdminRoutes.EVENTS,
        component: EventsComponent,
        data: {
          breadcrumb: 'Events'
        },
        children: [
          {
            path: "",
            component: EventsListComponent,
          },
          {
            path: AdminRoutes.NEW_EVENTS,
            component: EventEditorComponent,
            data: {
              breadcrumb: 'New'
            }
          }]
      },
      {
        path: AdminRoutes.MODULE_CONTROL,
        component: ModuleControlComponent,
        data: {
          breadcrumb: 'Advanced Control'
        }
      },
      {
        path: AdminRoutes.USERS,
        component: UsersComponent,
        data: {
          breadcrumb: 'Users'
        },
        children: [
          {
            path: "",
            component: UsersListComponent,
          },
          {
            path: AdminRoutes.USERS_NEW,
            component: NewUserComponent,
            data: {
              breadcrumb: 'New'
            }
          }]
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
