import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  constructor(
      private mealsService: MealService,
      private authService: AuthService,
      private router: Router,
      private modalController: ModalController,
      private orderService: OrderService
  ) { }
  todayMeal;
  meals;
  mealSearch;
  userInfo;
  apiUrl = environment.apiUrl;
  mealLabel;
  checkedmeal = false;
  isModalOpened = false;
  isLunchLady;

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isLunchLady = this.authService.getUserInfo(this.authService.getToken()).user.isLunchLady;
    this.getAllForToday();
  }

  ionViewWillLeave(){
    // permet de fermer le modal en quittant un view s'il est ouvert
    if(this.isModalOpened)
    this.modalController.dismiss();
  }

  // ngOnInit() {
  //   // this.getAllForToday();
  //   this.getMeals();
  // }

  /* mealSubmit = function (meal: Meal) {
     const newKey: any = Object.values(meal)[0];
     const values = Object.values(meal)[1];
     this.meals[newKey] = values;
   }; */

  getMeals() {
    this.mealsService.getAllMeals()
      .subscribe(
        data => {
          this.meals = data;

          console.log('Les différents plat sont : ');
          console.table(data);
        });
  }
  getAllForToday() {
    this.mealsService.findAllAvailableForToday()
      .subscribe((data) => {
        this.meals = data; console.log('Les plats du jour sont : ');
        this.mealSearch = this.meals;
        data.forEach(element => {
          console.log(element.label + '  Prix: ' + element.priceDF);
        });
        //this.meals = data; console.log('Les plats du jour sont : ');
        //this.mealSearch = this.meals;
      });

  }
  ondelete(idPlat: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/meal', 'edit', idPlat]);
    console.log('Plate numéro', idPlat);
  }
  onEdit(idPlat: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/meal', 'edit', idPlat]);
    console.log('Plate numéro', idPlat);
  }
  searchPlat(event) {
    const motcle = event.target.value.toLocaleLowerCase().trim();
    return this.mealSearch = this.meals.filter(tech => tech.label.toLocaleLowerCase().includes(motcle));


  }

  addToCart(mealId, slidingItem: IonItemSliding) {
  this.isModalOpened = true;
  slidingItem.close();
  console.log(mealId);
  this.mealsService.findOneMeal(mealId)
      .subscribe(
          async meal => { this.mealLabel = meal.label; localStorage.setItem('plat_' + mealId, meal.label + ' ' + mealId); },
          (error) => {},
          async () => {
              const modal = await this.modalController.create({
                component: ModalPage,
                cssClass: 'my-modal',
                componentProps: {
                  mealLabel: this.mealLabel
                }
              });
              return await modal.present();
      });
  }

  verifChecked() {
    if (this.checkedmeal) {
      this.checkedmeal = false;
    } else {
      this.checkedmeal = true;
    }


  }
}
