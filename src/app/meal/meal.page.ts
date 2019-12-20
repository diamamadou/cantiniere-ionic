import { Component, OnInit } from '@angular/core';
import {MealService} from '../services/meal.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  constructor(private mealService: MealService, private authService: AuthService, private router: Router) { }
  todayMeal;
  userInfo;
  ngOnInit() {
    this.getAllForToday();
  }
  getAllForToday() {
    this.mealService.findAllAvailableForToday()
      .subscribe(data => {this.todayMeal = data; console.log('Les plats du jour sont : ');
                          data.forEach(element => {
          // this.todayMeal = element.meals;
          console.log(element.label + '  Prix: ' + element.priceDF);
        })
        ; });
    this.mealService.findAllAvailableForToday()
      .subscribe(data => this.todayMeal = data);

    if (this.authService.getToken() !== null) {
      this.userInfo = this.authService.getUserInfo(this.authService.getToken());
      console.log('Bienvenue ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
    }
  }

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

}