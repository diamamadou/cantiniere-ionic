import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ModalPage} from '../modal/modal.page';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  order;
  key;
  computedPrice;
  cantiniere;

  constructor(
      private orderService: OrderService,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private modalController: ModalController) {
    this.route.params
        .subscribe(params => {this.key = params.id; console.log(params.id); });
  }

  ngOnInit() {
    const userInfos = this.authService.getUserInfo(this.authService.getToken());
    if (userInfos)
      this.cantiniere = userInfos.user.isLunchLady;

    this.getOrder(this.key);
    this.computePrice(this.key, -1);
  }

  getOrder(orderId) {
    this.orderService.getOrder(orderId)
        .subscribe(
            order => {console.log(order); this.order = order; },
            (err) => console.log('Votre commande n\'a pas été trouvé !'),
        );
  }

  computePrice(orderId, constraintId) {
    this.orderService.computePrice(orderId, constraintId)
        .subscribe(
            order => { this.computedPrice = order.priceDF; },
            (err) => console.log('Votre commande n\'a pas été trouvé')
        );
  }

  cancelOrder(orderId) {
    this.orderService.cancelOrder(orderId)
        .subscribe(order => {  },
            (error) => { console.log('Votre commande n\'a pas été trouvé !'); },
            async () => {
              const modal = await this.modalController.create({
                component: ModalPage,
                cssClass: 'my-modal',
                componentProps: {
                  orderCanceled: true
                }
              });
              return await modal.present();
            }
        );
  }

  deliveryAndPay(orderId, constraintId) {
    this.orderService.deliveryAndPay(orderId, constraintId)
        .subscribe(
            order => { console.log(order); },
            err => { console.log('Vous n\'avez assez d\'argent :)'); },
            async () => {
              const modal = await this.modalController.create({
                component: ModalPage,
                cssClass: 'my-modal',
                componentProps: {
                  deliveredAndPayed: true
                }
              });
              return await modal.present();
            }
        );
  }
}
