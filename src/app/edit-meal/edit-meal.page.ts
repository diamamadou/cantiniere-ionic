import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { IngredientsService } from '../ingredients.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

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
    private camera: Camera,
    private alertController: AlertController
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

  update(form) {
    const weeknumber = moment(form.form.value.availableForWeeks, "YYYYMMDD").week();
    form.form.value.availableForWeeks = [weeknumber];
    console.log(form.form.value);
    this.serviceMeal.updateMeal(form.form.value, this.mealId)
      .subscribe(data => {
        if(this.mealImage.startsWith('data') || this.mealImage.startsWith('img/meal')) {
          this.router.navigate(['/meal']);
        }
        
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
      this.mealImage = this.capturedPictureUrl;
    }, (err) => {
      console.log(err)
    });
  }

  async confirmAlert(mealObject) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous confirmer la modification de ce plat ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('canceled');
          }
        }, {
          text: 'Confirmer',
          cssClass: 'success',
          handler: () => { this.update(mealObject)
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmedAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmé',
      message: 'Ce plat a été modifié ',
      buttons: [
        {
          text: 'OK',
          cssClass: 'danger',
          handler: () => {
            if(this.mealImage.startsWith('data') || this.mealImage.startsWith('img/meal')) {
              this.router.navigate(['/meal']);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
