import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orders;
  meals;
  quantityMealDefined;
  menuDefined;
  computedPrice;
  orderId;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
      const userInfos = this.authService.getUserInfo(this.authService.getToken()).user;
    // this.addOrder();
    // this.cancelOrder(2);
    // this.computePrice(this., -1);
    // this.deliveryAndPay(5, -1);
    // this.getOrder(2);
     // this.findAllBetweenInStatus('02-03-2019', '12-06-2019', 0);
      if(!userInfos.isLunchLady)
          this.findAllForUser(userInfos.id);
      else
          this.findAll();
     // console.log(this.authService.getUserInfo(this.authService.getToken()));
  }

  addOrder() {
    this.orderService.addOrder(this.orderId)
        .subscribe(order => {console.log(order);
            },
            (error) =>
                console.log('Vous ne pouvez pas commander à cette heure / Le nombre de commandes maximum est atteint !')
        );
  }

  cancelOrder(orderId) {
    this.orderService.cancelOrder(orderId)
        .subscribe(order => {console.log(order); },
            (error) => console.log('Votre commande n\'a pas été trouvé !')
        );
  }

  computePrice(orderId, constraintId) {
    this.orderService.computePrice(orderId, constraintId)
        .subscribe(
            order => {console.log(order); this.computedPrice = order;},
            (err) => console.log('Votre commande n\'a pas été trouvé')
        );
  }

  deliveryAndPay(orderId, constraintId) {
    this.orderService.deliveryAndPay(orderId, constraintId)
        .subscribe(
            order => {console.log(order); },
            err => console.log('Vous n\'avez assez d\'argent :)')
        );
  }

  getOrder(orderId) {
    this.orderService.getOrder(orderId)
        .subscribe(
            order => {console.log(order); },
            (err) => console.log('Votre commande n\'a pas été trouvé !'),
            // () => {this.route.navigate(['/']); } // [routerLink]="['/detail-meal/'}
        );
    console.log('hello');
  }

  findAll() {
    this.orderService.findAll()
        .subscribe(
            data => {this.orders = data; this.meals = data.quantityMeals;
              console.log(data);
              data.forEach(element => {
                // this.todayMeal = element.meals;
                this.quantityMealDefined = element.quantityMeals;
                this.menuDefined = element.menu;
                // console.log(element.menu);
                // console.log(element);
              }); },
            (err) => console.log('Vous n\'ètes pas cantinière !'),
            () => {this.orderService = this.orders; }
        );
  }

  findAllBetweenInStatus(beginDate, endDate, status) {
     this.orderService.findAllBetweenInStatus(beginDate, endDate, status)
        .subscribe(data => { console.log(data); },
            (err) => { console.log('Vous n\'ètes pas connectés / Vous n\ètes pas cantinière'); });
  }

  findAllForUser(userId) {
      this.orderService.findAllForUser(userId)
          .subscribe(orders => { this.orders = orders; console.log(orders); },
          (err) => { console.log('Vous n\'avez aucune commande'); });
  }
}
