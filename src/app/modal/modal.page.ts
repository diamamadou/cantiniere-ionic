import {Component, Input, OnInit} from '@angular/core';
import {NavParams, ModalController, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {OrderService} from '../services/order.service';
import {MenuService} from '../services/menu.service';
import {MealService} from '../services/meal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() name: string;
  @Input() email;
  @Input() mealLabel;
  @Input() menuLabel;
  @Input() deliveredAndPayed;
  @Input() orderCanceled;
  @Input() btnLabel;
  @Input() orderId;
  @Input() userId;

  beginDate;
  endDate;
  status;
  filterObject;
  menus;
  menu;
  meals;
  meal;
  selectedMenu;
  selectedMeal;

  constructor(
      navParams: NavParams,
      private modalController: ModalController,
      private router: Router,
      private menuService: MenuService,
      private mealService: MealService,
      private orderService: OrderService,
      private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getAllMenusForToday();
    this.getAllMealsForToday();

    const week = moment('2020-01-25').week();
    console.log(week);
  }

  ionViewWillLeave(){
    this.closeModal();
  }

  closeModal() {
    this.modalController.dismiss();
    if (this.deliveredAndPayed || this.orderCanceled) {
      this.router.navigate(['/order']);
    }
  }

  openCart() {
    this.router.navigate(['/cart']);
    this.modalController.dismiss();
  }

  openFilterModal(filter) {
    this.beginDate = moment(this.beginDate).format('DD-MM-YYYY');
    this.endDate = moment(this.endDate).format('DD-MM-YYYY');

    if (filter === 'entre_dates') {
      this.filterObject = {
        filter,
        begin_date: this.beginDate,
        end_date: this.endDate,
        status: this.status
      };
    } else if (filter === 'par_utilisateur' || filter === 'aujourdhui_utilisateur') {
      this.filterObject = {
        filter,
        user_id: this.userId
      };
    }

    this.router.navigate(['/order'], {
      queryParams: this.filterObject
    });

    this.closeModal();
  }

  getAllMenusForToday() {
    this.menuService.findAllAvailableForToday()
        .subscribe(data => { this.menus = data; }
        );
  }

  getAllMealsForToday() {
    this.mealService.findAllAvailableForToday()
        .subscribe(data => { this.meals = data; }
        );
  }

  updateOrder() {
    const meal = this.selectedMeal;
    const menu = this.selectedMenu;
    if (this.selectedMenu) {
      console.log(menu);
      this.menuService.find(menu)
          .subscribe(data => {
            const order = {
              constraintId: -1,
              menuId: data.id,
              userId: this.userId
            };
            this.orderService.updateOrder(this.orderId, order).subscribe(updatedOrder => {});
          });
    }
    if (this.selectedMeal) {
        console.log(meal);
        this.mealService.findOneMeal(meal)
            .subscribe(data => {
              const order = {
                constraintId: -1,
                quantityMeals: [
                  {
                    mealId: data.id,
                    quantity: 1,
                  },
                ],
                userId: this.userId
              };
              this.orderService.updateOrder(this.orderId, order).subscribe(updatedOrder => {});
            });
    }
    this.confirmedAlert();
  }

  async confirmAlert() {
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
          handler: () => { this.updateOrder()
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmedAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmé',
      message: 'Votre commande a été annulé ',
      buttons: [
        {
          text: 'OK',
          cssClass: 'danger',
          handler: () => {
            this.closeModal();
            this.router.navigate(['/order']);
          }
        }
      ]
    });
    await alert.present();
  }
}
