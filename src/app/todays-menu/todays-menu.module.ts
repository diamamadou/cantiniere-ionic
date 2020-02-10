import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodaysMenuPageRoutingModule } from './todays-menu-routing.module';

import { TodaysMenuPage } from './todays-menu.page';
import { ModalPageModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodaysMenuPageRoutingModule,
    ModalPageModule
  ],
  declarations: [TodaysMenuPage]
})
export class TodaysMenuPageModule {}
