import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ModalPage} from '../modal/modal.page';
import {ModalController, AlertController} from '@ionic/angular';

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
  isModalOpened = false;

  constructor(
      private orderService: OrderService,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private modalController: ModalController,
      private alertController: AlertController) {
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

  ionViewWillLeave(){
    // permet de fermer le modal en quittant un view s'il est ouvert
    if(this.isModalOpened)
      this.modalController.dismiss();
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
             () => { this.confirmedCancelAlert(); }
        );
  }

  deliveryAndPay(orderId, constraintId) {
    this.orderService.deliveryAndPay(orderId, constraintId)
        .subscribe(
            order => { console.log(order); },
            err => { console.log('Vous n\'avez assez d\'argent :)'); },
            () => { this.confirmedDeliverAndPayAlert(); }
        );
  }

  async openUpdateOrderModal() {
    this.isModalOpened = true;
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

  async confirmCancelAlert(orderId) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous confirmer l\'annulation de cette commande ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('canceled');
          }
        }, {
          text: 'Confirmer',
          cssClass: 'success',
          handler: () => { this.cancelOrder(orderId)
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmedCancelAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmé',
      message: 'Votre commande a été annulé ',
      buttons: [
        {
          text: 'OK',
          cssClass: 'danger',
          handler: () => {
            this.router.navigate(['/order']);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmDeliverAndPayAlert(orderId, constraintId) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous confirmer la livraison de cette commande ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('canceled');
          }
        }, {
          text: 'Confirmer',
          cssClass: 'success',
          handler: () => { this.deliveryAndPay(orderId, constraintId) }
        }
      ]
    });
    await alert.present();
  }

  async confirmedDeliverAndPayAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmé',
      message: 'La commande a été payée et livrée',
      buttons: [
        {
          text: 'OK',
          cssClass: 'danger',
          handler: () => {
            this.router.navigate(['/order']);
          }
        }
      ]
    });
    await alert.present();
  }
}
