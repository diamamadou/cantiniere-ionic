import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.page.html',
  styleUrls: ['./edit-meal.page.scss'],
})
export class EditMealPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceMeal: MealService,
  ) { }
  IdPlat;
  meal;
  apiUrl = environment.apiUrl;

  ngOnInit() {
    this.route.params
      .subscribe(params => { this.IdPlat = params.IdPlat; console.log(params.IdPlat); });
    this.getOneMeal(this.IdPlat);
  }

  getOneMeal(IdPlat) {
    this.serviceMeal.findOneMeal(IdPlat)
      .subscribe(
        meal => { console.log(meal); this.meal = meal; },
        (err) => console.log('Votre plat n\'a pas été trouvé !'),
      );
  }

  edit(form) {
    this.serviceMeal.updateMeal(form.form.value, this.IdPlat)
      .subscribe(data => {
        this.router.navigate(['/home']);
      });
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  compareWith = this.compareWithFn;

}
