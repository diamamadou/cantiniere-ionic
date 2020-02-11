import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MealService } from '../services/meal.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.page.html',
  styleUrls: ['./update-menu.page.scss'],
})
export class UpdateMenuPage implements OnInit {

  menuId;
  menu;
  meals;
  apiUrl = environment.apiUrl;
  capturedPictureUrl: string;
  ingred;
  availableForWeeks;
  menuImage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private mealService: MealService,
    private camera: Camera,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => { this.menuId = params.id; });
    this.getMenu(this.menuId);
    this.getMeals();
  }

  getMenu(menuId) {
    this.menuService.find(menuId)
      .subscribe(data => {this.menu = data; this.menuImage = data.image})
  }

  getMeals() {
    this.mealService.findAllAvailableForToday()
      .subscribe(data => {this.meals = data})
  }

  update(form) {
    const weeknumber = moment(form.form.value.availableForWeeks, "YYYYMMDD").week();
    form.form.value.availableForWeeks = [weeknumber];
    console.log(form.form.value);
    this.menuService.updateMenu(form.form.value, this.menuId)
      .subscribe(data => { this.confirmedAlert(); });
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
      this.menuImage = this.capturedPictureUrl;
    }, (err) => {
      console.log(err)
    });
  }

  cancel() {
    this.router.navigate(['/todays-menu']);
  }

  async confirmAlert(menuObject) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez-vous confirmer la modification de ce menu ?',
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
          handler: () => { this.update(menuObject)
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmedAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmé',
      message: 'Ce menu a été modifié ',
      buttons: [
        {
          text: 'OK',
          cssClass: 'danger',
          handler: () => {
            if(this.menuImage.startsWith('data') || this.menuImage.startsWith('img/meal')) {
              this.router.navigate(['/todays-menu']);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
