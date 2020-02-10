import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
//import * as fs from 'fs-extra';
//const fs = require('fs-extra')

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
    private camera: Camera
  ) { }

  IdPlat;
  meal;
  apiUrl = environment.apiUrl;
  capturedPictureUrl: string;

  ngOnInit() {console.log(this.capturedPictureUrl)
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
    console.log(form.form.value);
    // this.serviceMeal.updateMeal(form.form.value, this.IdPlat)
    //   .subscribe(data => {
    //     this.router.navigate(['/home']);
    //   });
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
  }

}
