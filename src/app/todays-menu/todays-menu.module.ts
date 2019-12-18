import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodaysMenuPageRoutingModule } from './todays-menu-routing.module';

import { TodaysMenuPage } from './todays-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodaysMenuPageRoutingModule
  ],
  declarations: [TodaysMenuPage]
})
export class TodaysMenuPageModule {}
