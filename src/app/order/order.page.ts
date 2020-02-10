import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {AuthService} from '../services/auth.service';
import {ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';
import {ActivatedRoute, Router} from '@angular/router';

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

  btnName;
  filter;
  beginDate;
  endDate;
  status;
  userId;
  isFiltered;

  isModalOpened = false;

  @Input() hello;
  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private modalController: ModalController,
      private route: ActivatedRoute,
      private router: Router,
    ) {
      this.route.queryParams
          .subscribe(data => {
              this.filter = data.filter;
              this.beginDate = data.begin_date;
              this.endDate = data.end_date;
              this.status = data.status;
              this.userId = data.user_id;
              if (this.filter) { this.filtered(); this.isFiltered = true; } },
          );
  }

  ngOnInit() {}

  ionViewWillEnter() {
      this.allOrders();
  }
    ionViewWillLeave(){
        // permet de fermer le modal en quittant un view s'il est ouvert
        if(this.isModalOpened)
        this.modalController.dismiss();
    }

  getOrder() {
    this.orderService.getOrder(this.inputOrderId)
        .subscribe(
            order => { this.router.navigate(['/order-detail/' + order.id]); },
            (err) => console.log('Votre commande n\'a pas été trouvé !'),
            () => {}
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
            () => {  }
        );
  }

  findAllBetweenInStatus() {
     this.orderService.findAllBetweenInStatus(this.beginDate, this.endDate, this.status)
        .subscribe(data => { this.orders = data; console.log(data); },
            (err) => { console.log('Vous n\'ètes pas connectés / Vous n\'ètes pas cantinière'); }
        );
  }

  findAllForUser(userId) {
      this.orderService.findAllForUser(userId)
          .subscribe(orders => { this.orders = orders; console.log(orders); },
          (err) => { console.log('Vous n\'avez aucune commande'); });
  }

  findAllForUserToday(userId) {
      this.orderService.findAllForUserToday(userId)
            .subscribe(orders => { this.orders = orders; console.log(orders); },
                (err) => { console.log('Vous n\'avez aucune commande'); });
  }

  filtered() {
      if (this.filter === 'entre_dates') {
          this.findAllBetweenInStatus();
      } else if (this.filter === 'par_utilisateur') {
          this.findAllForUser(this.userId);
      } else if (this.filter === 'aujourdhui_utilisateur') {
          this.findAllForUserToday(this.userId);
      }
  }

  allOrders() {
      this.isFiltered = false;
      const userInfos = this.authService.getUserInfo(this.authService.getToken()).user;
      console.log('filter ' + this.isFiltered + ' userinfos: ' + userInfos);
      if (!userInfos.isLunchLady && !this.isFiltered) {
          this.findAllForUser(userInfos.id);
      } else if (userInfos.isLunchLady && !this.isFiltered) {
          this.findAll();
      }
      this.router.navigate(['/order']);
  }

  async openFilterModal(buttonName) {
      this.isModalOpened = true;
      if (buttonName === 'entre_dates') {
          this.btnName = 'entre_dates';
      } else if (buttonName === 'par_utilisateur') {
          this.btnName = 'par_utilisateur';
      } else if (buttonName === 'aujourdhui_utilisateur') {
          this.btnName = 'aujourdhui_utilisateur';
      }
      const modal = await this.modalController.create({
          component: ModalPage,
          cssClass: 'my-modal',
          componentProps: {
              btnLabel: this.btnName
          }
      });
      return await modal.present();
  }
}
