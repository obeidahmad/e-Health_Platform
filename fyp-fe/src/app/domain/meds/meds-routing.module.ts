import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedsViewComponent} from "../../features/meds/meds-view.component";
import {ViewAllComponent} from "../../features/meds/pages/view-all/view-all.component";
import {MedDetailComponent} from "../../features/meds/pages/med-detail/med-detail.component";
import {MedRoutes} from "../med-routes";
import {CreateMedFormComponent} from "../../features/meds/pages/create-med-form/create-med-form.component";

const routes: Routes = [

  {
    path: '',
    component: MedsViewComponent,
    children: [
      {
        path: '',
        component: ViewAllComponent
      },
      {
        path: MedRoutes.CREATE,
        component: CreateMedFormComponent
      },
      {
        path: ':id',
        component: MedDetailComponent
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedsRoutingModule {
}
