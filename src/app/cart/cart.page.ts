import { Component, OnInit } from '@angular/core';
import {MealService} from '../services/meal.service';
import {OrderService} from '../services/order.service';
import {AuthService} from '../services/auth.service';
import {MenuService} from '../services/menu.service';

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

  constructor(
      private mealService: MealService,
      private orderService: OrderService,
      private authService: AuthService,
      private menuService: MenuService
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
              } else {
                localStorage.removeItem('menu_' + this.menu.id);
                location.reload();
              }
              }
        );
  }

  deleteOrder(orderType) {
    if (orderType === 'meal') {
      localStorage.removeItem('plat_' + this.meal.id);
    } else {
      localStorage.removeItem('menu_' + this.menu.id);
      location.reload();
    }
  }

}
