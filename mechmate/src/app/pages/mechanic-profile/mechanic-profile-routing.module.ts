import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanicProfilePage } from './mechanic-profile.page';

const routes: Routes = [
  {
    path: '',
    component: MechanicProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MechanicProfilePageRoutingModule {}
