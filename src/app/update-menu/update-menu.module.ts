import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMenuPageRoutingModule } from './update-menu-routing.module';

import { UpdateMenuPage } from './update-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMenuPageRoutingModule
  ],
  declarations: [UpdateMenuPage]
})
export class UpdateMenuPageModule {}
