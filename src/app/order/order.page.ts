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
  inputOrderId;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
      const userInfos = this.authService.getUserInfo(this.authService.getToken()).user;
      // this.findAllBetweenInStatus('02-03-2019', '12-06-2019', 0);
      if(!userInfos.isLunchLady)
          this.findAllForUser(userInfos.id);
      else
          this.findAll();
  }

  getOrder() {
    this.orderService.getOrder(this.inputOrderId)
        .subscribe(
            order => { console.log(order); },
            (err) => console.log('Votre commande n\'a pas été trouvé !'),
        );
  }

  findAll() {
    this.orderService.findAll()
        .subscribe(
            data => {this.orders = data; this.meals = data.quantityMeals; console.log('Les numéros des commandes sont: ');
                     data.forEach(element => {
                     this.quantityMealDefined = element.quantityMeals;
                     this.menuDefined = element.menu;
                     console.log(element.id);
              }); },
            (err) => console.log('Vous n\'ètes pas cantinière !'),
            () => { this.orderService = this.orders; }
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
