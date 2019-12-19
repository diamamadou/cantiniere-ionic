import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMenuJourPage } from './detail-menu-jour.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMenuJourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMenuJourPageRoutingModule {}
