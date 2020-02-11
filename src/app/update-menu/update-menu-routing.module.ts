import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMenuPage } from './update-menu.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMenuPageRoutingModule {}
