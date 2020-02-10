import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { IngredientsService } from '../ingredients.service';
import * as moment from 'moment';

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
    private ingredientService: IngredientsService,
    private camera: Camera
  ) { }

  mealId;
  meal;
  apiUrl = environment.apiUrl;
  capturedPictureUrl: string;
  ingredientList;
  ingred;
  availableForWeeks;
  mealImage;

  ngOnInit() {
    this.route.params
      .subscribe(params => { this.mealId = params.IdPlat; console.log(params.IdPlat); });
    this.getOneMeal(this.mealId);

    this.getIngredients();
  }

  getOneMeal(mealId) {
    this.serviceMeal.findOneMeal(mealId)
      .subscribe(
        meal => { console.log(meal); this.meal = meal; this.mealImage = meal.image},
        (err) => console.log('Votre plat n\'a pas été trouvé !'),
      );
  }

  getIngredients() {
    this.ingredientService.getIngredients()
      .subscribe(data => {this.ingredientList = data})
  }

  edit(form) {console.log(form.form.value.availableForWeeks);
    const weeknumber = moment(form.form.value.availableForWeeks, "YYYYMMDD").week();
    //console.log(weeknumber);
    form.form.value.availableForWeeks = [weeknumber];
    console.log(form.form.value);
    this.serviceMeal.updateMeal(form.form.value, this.mealId)
      .subscribe(data => {
        this.router.navigate(['/meal']);
      });
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  compareWith = this.compareWithFn;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  takePicture() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      let bas64Image = 'data:image/jpeg;base64, ' + imageData;
      this.capturedPictureUrl = bas64Image;
      console.log('photo', this.capturedPictureUrl, ' mamso');
      //fs.writeFileSync('./test.txt', this.capturedPictureUrl);
      //fs.write
    }, (err) => {
      console.log(err)
    });
    this.mealImage = this.capturedPictureUrl;
  }

}
