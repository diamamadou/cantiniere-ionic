import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  order;
  key;
  computedPrice;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.route.params
        .subscribe(params => {this.key = params.id; console.log(params.id); });
  }

  ngOnInit() {
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
            order => {console.log(order); this.computedPrice = order.priceDF; },
            (err) => console.log('Votre commande n\'a pas été trouvé')
        );
  }
}
