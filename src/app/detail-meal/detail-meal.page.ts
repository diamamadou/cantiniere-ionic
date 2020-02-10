import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { environment } from 'src/environments/environment';
import { LoadingController, IonItemSliding, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-detail-meal',
  templateUrl: './detail-meal.page.html',
  styleUrls: ['./detail-meal.page.scss'],
})
export class DetailMealPage implements OnInit {
  IdPlat;
  meal;
  apiUrl = environment.apiUrl;
  mealLabel;
  mealImg;
  isBase64Img;

  isModalOpened = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceMeal: MealService,
    public loadingCtrl: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => { this.IdPlat = params.IdPlat; console.log(params.IdPlat); });
    this.getOneMeal(this.IdPlat);
  }

  ionViewWillLeave(){
    // permet de fermer le modal en quittant un view s'il est ouvert
    if(this.isModalOpened)
    this.modalController.dismiss();
  }

  getOneMeal(IdPlat) {
    this.serviceMeal.findOneMeal(IdPlat)
      .subscribe(
        meal => { console.log(meal); this.meal = meal;  this.mealImg = meal.image;
          if(meal.image.startsWith('data')){
            this.isBase64Img = true;
          } else {
            this.isBase64Img = false;
          };},
        (err) => console.log('Votre plat n\'a pas été trouvé !'),
      );
  }
  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

  addToCart(mealId, slidingItem: IonItemSliding) {
    this.isModalOpened = true;
    if (slidingItem)
        slidingItem.close();
    console.log(mealId);
    this.serviceMeal.findOneMeal(mealId)
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
