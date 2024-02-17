import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanicListPage } from './mechanic-list.page';

const routes: Routes = [
  {
    path: '',
    component: MechanicListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MechanicListPageRoutingModule {}
