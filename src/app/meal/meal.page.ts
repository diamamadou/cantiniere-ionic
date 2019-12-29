import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
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
  userInfo;
  apiUrl = environment.apiUrl;
  mealLabel;
  ngOnInit() {
    this.getAllForToday();
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
      .subscribe(data => {
        this.meals = data; console.log('Les plats du jour sont : ');
        data.forEach(element => {
          // this.todayMeal = element.meals;
          console.log(element.label + '  Prix: ' + element.priceDF);
        })
          ;
      });

  }
  ondelete(idPlat: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/meal', 'edit', ':IdPlat']);
    console.log('Plate numéro', idPlat = 13);
  }
  onEdit(idPlat: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/meal', 'edit', ':IdPlat']);
    console.log('Plate numéro', idPlat = 13);
  }

   addToCart(mealId, slidingItem: IonItemSliding) {
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

}
