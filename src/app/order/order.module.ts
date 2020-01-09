import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import {ModalPageModule} from '../modal/modal.module';
import {OrderService} from '../services/order.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    ModalPageModule
  ],
  declarations: [OrderPage],
})
export class OrderPageModule {}
