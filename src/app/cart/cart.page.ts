import { Component, OnInit } from '@angular/core';
import {MealService} from '../services/meal.service';
import {OrderService} from '../services/order.service';
import {AuthService} from '../services/auth.service';
import {MenuService} from '../services/menu.service';
import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  meal;
  menu;
  newOrder;
  userId;
  confirmModal;

  constructor(
      private mealService: MealService,
      private orderService: OrderService,
      private authService: AuthService,
      private menuService: MenuService,
      private alertController: AlertController,
      private router: Router,
  ) { }

  ngOnInit() {
    const userInfos = this.authService.getUserInfo(this.authService.getToken());
    if (userInfos) {
      this.userId = userInfos.user.id;
    } else {
      console.log('Vous n\'ètes pas connectés');
    }
  }

  ionViewWillEnter() {
    this.showMealCart();
    this.showMenuCart();
  }

  showMealCart() {
    const search = 'plat';
    const values = Object.keys(localStorage)
        .filter( (key) => key.startsWith(search) )
        .map( (key) => localStorage[key] );
    values.forEach(meal => {
      this.mealService.findOneMeal(meal.slice(-2))
          .subscribe(data => { this.meal = data; });
    });
  }

  showMenuCart() {
    const search = 'menu';
    const values = Object.keys(localStorage)
        .filter( (key) => key.startsWith(search) )
        .map( (key) => localStorage[key] );
    values.forEach(menu => {
      this.menuService.find(menu.slice(-2))
          .subscribe(data => { this.menu = data; });
    });
  }

  addOrder(orderType) {
    if (orderType === 'meal') {
      this.newOrder = {
        constraintId : -1,
        quantityMeals: [
          {mealId: this.meal.id,
            quantity: 1
          }
        ],
        userId: this.userId
      };
    } else {
      this.newOrder = {
        constraintId : -1,
        menuId: this.menu.id,
        userId: this.userId
      };
    }

    console.log(this.newOrder);
    this.orderService.addOrder(this.newOrder)
        .subscribe(order => { console.log('order'); console.log('this.meal'); },
            (error) => { console.log('Vous ne pouvez pas commander à cette heure / Le nombre de commandes maximum est atteint !'); },
            () => {
              if (orderType === 'meal') {
                localStorage.removeItem('plat_' + this.meal.id);
                this.confirmedAlert();
              } else {
                localStorage.removeItem('menu_' + this.menu.id);
                this.confirmedAlert();
                //location.reload();
              }
              }
        );
  }

  async confirmAlert(orderType) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous confirmer cette commande ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: (cancel) => {
            console.log('canceled');
          }
        }, {
          text: 'Confirmer',
          cssClass: 'success',
          handler: () => { this.addOrder(orderType)
            console.log(this.meal);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmedAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmé',
      message: 'Votre commande a été effectuée ',
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

  async deleteAlert(orderType) {
    const alert = await this.alertController.create({
      header: 'Suppression',
      message: 'Voulez-vous confirmer la suppression de cette commande ?',
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
          handler: () => { this.deleteOrder(orderType)
            console.log(this.meal);
          }
        }
      ]
    });
    await alert.present();
  }

  async deletedAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmé',
      message: 'Votre commande a été supprimé ',
      buttons: [
        {
          text: 'OK',
          cssClass: 'success',
          handler: () => {
            location.reload();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteOrder(orderType) {
    if (orderType === 'meal') {
      localStorage.removeItem('plat_' + this.meal.id);
      this.deletedAlert();
    } else {
      localStorage.removeItem('menu_' + this.menu.id);
      this.deletedAlert();
    }
  }

}
