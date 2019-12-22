import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-meal',
  templateUrl: './detail-meal.page.html',
  styleUrls: ['./detail-meal.page.scss'],
})
export class DetailMealPage implements OnInit {
  IdPlat;
  meal;
  apiUrl = environment.apiUrl;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceMeal: MealService,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => { this.IdPlat = params.IdPlat; console.log(params.IdPlat); });
    this.getOneMeal(this.IdPlat);
  }
  getOneMeal(IdPlat) {
    this.serviceMeal.findOneMeal(IdPlat)
      .subscribe(
        meal => { console.log(meal); this.meal = meal; },
        (err) => console.log('Votre commande n\'a pas été trouvé !'),
      );
  }


}
