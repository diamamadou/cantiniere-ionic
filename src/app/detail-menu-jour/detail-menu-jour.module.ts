import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMenuJourPageRoutingModule } from './detail-menu-jour-routing.module';

import { DetailMenuJourPage } from './detail-menu-jour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMenuJourPageRoutingModule
  ],
  declarations: [DetailMenuJourPage]
})
export class DetailMenuJourPageModule {}
