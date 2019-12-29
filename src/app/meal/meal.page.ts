import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  constructor(
    private mealsService: MealService, private authService: AuthService, private router: Router

  ) { }
  todayMeal;
  meals;
  mealSearch;
  userInfo;
  apiUrl = environment.apiUrl;
  checkedmeal = false;
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
        this.mealSearch = this.meals;
        data.forEach(element => {
          // this.todayMeal = element.meals;
          console.log(element.label + '  Prix: ' + element.priceDF);
        })
          ;
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


  // getAllForToday() {
  //   this.mealService.findAllAvailableForToday()
  //     .subscribe(data => {
  //     this.todayMeal = data; console.log('Les plats du jour sont : ');
  //       data.forEach(element => {
  //         // this.todayMeal = element.meals;
  //         console.log(element.label + '  Prix: ' + element.priceDF);
  //       })
  //         ;
  //     });
  //   this.mealService.findAllAvailableForToday()
  //     .subscribe(data => this.todayMeal = data);

  //   if (this.authService.getToken() !== null) {
  //     this.userInfo = this.authService.getUserInfo(this.authService.getToken());
  //     console.log('Bienvenue ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
  //   }
  // }


  logout() {
    this.authService.logOut();
    this.router.navigate(['/platDuJour']);
    console.log('vous ètes déconnectés !');
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
  verifChecked() {
    if (this.checkedmeal) {
      this.checkedmeal = false;
    } else {
      this.checkedmeal = true;
    }


  }
}
