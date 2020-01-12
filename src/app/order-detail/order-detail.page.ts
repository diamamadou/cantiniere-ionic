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
  orderId;
  computedPrice;
  cantiniere;
  userId;

  constructor(
      private orderService: OrderService,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private modalController: ModalController) {
    this.route.params
        .subscribe(params => {this.orderId = params.id; console.log(params.id); });
  }

  ngOnInit() {
    const userInfos = this.authService.getUserInfo(this.authService.getToken());
    if (userInfos) {
      this.cantiniere = userInfos.user.isLunchLady;
    }
  }

  ionViewWillEnter() {
     this.getOrder(this.orderId);
     this.computePrice(this.orderId, -1);
  }

  getOrder(orderId) {
    this.orderService.getOrder(orderId)
        .subscribe(
            order => {console.log(order); this.order = order; this.userId = order.user.id; },
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

  async openUpdateOrderModal() {
      const modal = await this.modalController.create({
          component: ModalPage,
          cssClass: 'my-modal',
          componentProps: {
              orderId: this.orderId,
              userId: this.userId,
            }
      });
      return await modal.present();
  }
}
