import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {IonItemSliding, ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';

@Component({
  selector: 'app-todays-menu',
  templateUrl: './todays-menu.page.html',
  styleUrls: ['./todays-menu.page.scss'],
})
export class TodaysMenuPage implements OnInit {

  todayMenu;
  todayMeal = [];
  key;
  errors;
  userInfo;
  menuLabel;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private modalController: ModalController) {
    this.route.params
      .subscribe(params => this.key = params);
  }

  ngOnInit() {
    this.getAllForToday();
  }

  getAllForToday() {
    this.menuService.findAllAvailableForToday()
      .subscribe(data => {
      this.todayMenu = data; console.log('Les menus du jour sont : ');
        data.forEach(element => { console.log(element);
          // this.todayMeal = element.meals;
          //console.log(element.label + '  Prix: ' + element.priceDF);
        })
          ;
      });
    this.menuService.findAllAvailableForToday()
      .subscribe(data => this.todayMeal = data);
    if (this.authService.getToken() !== null) {
      this.userInfo = this.authService.getUserInfo(this.authService.getToken());
      console.log('Bienvenue ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
    }
  }

  menuDetail(id) {
    this.menuService.findAllAvailableForToday()

      .subscribe(data => {
      this.todayMeal = data[id]; // console.log(data[id]);
      },
        error => { this.errors = error; },
        () => { this.router.navigate(['/detail-menu-jour/' + id]); }
      );
  }
  deleteMenu(menuId) {
    this.menuService.deleteMenu(menuId)
      .subscribe(data => { });
    this.userInfo = this.authService.getUserInfo(this.authService.getToken());
  }


  addMenu() {
    this.menuService.addMenu()
      .subscribe(data => this.addMenu = data);
    this.userInfo = this.authService.getUserInfo(this.authService.getToken());
  }


  updateMenu(menuId) {
    this.menuService.updateMenu(menuId)
      .subscribe(data => this.updateMenu = data);
    this.userInfo = this.authService.getUserInfo(this.authService.getToken());

  }
  
  findAllMenu() {
    this.menuService.findAll()
      .subscribe(data => this.findAllMenu = data);
    this.userInfo = this.authService.getUserInfo(this.authService.getToken());

  }

  findMenu(menuId) {
    this.menuService.find(menuId)
      .subscribe(data => this.findMenu = data);
    this.userInfo = this.authService.getUserInfo(this.authService.getToken());

  }
  findforweek(WeekDay){
  this.menuService.findAllavailableForWeek(WeekDay)
  .subscribe(data => this.findforweek = data);
   this.userInfo = this.authService.getUserInfo(this.authService.getToken());
   }

  addToCart(mealId, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log(mealId);
    /*this.menuService.find(mealId)
        .subscribe(
            async meal => { this.menuLabel = meal.label; localStorage.setItem('plat_' + mealId, meal.label + ' ' + mealId); },
            (error) => {},
            async () => {
              const modal = await this.modalController.create({
                component: ModalPage,
                cssClass: 'my-modal',
                componentProps: {
                  name: 'T0X',
                  email: 'mamsodia',
                  mealLabel: this.menuLabel
                }
              });
              return await modal.present();
            });*/
  }

}



