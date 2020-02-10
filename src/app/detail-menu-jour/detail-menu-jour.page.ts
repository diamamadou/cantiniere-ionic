import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import {IonItemSliding, ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-menu-jour',
  templateUrl: './detail-menu-jour.page.html',
  styleUrls: ['./detail-menu-jour.page.scss'],
})
export class DetailMenuJourPage implements OnInit {

  apiUrl = environment.apiUrl;
  key;
  mealDay = [];
  menuId;
  menuLabel;

  isModalOpened;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private modalController: ModalController) {
    this.route.params
    .subscribe(params => this.key = params.id);
   }

  ngOnInit() {
    this.menuDetail();
  }

  ionViewWillLeave(){
    // permet de fermer le modal en quittant un view s'il est ouvert
    if(this.isModalOpened)
    this.modalController.dismiss();
  }

  // menuDetail() {
  //   this.menuService.findAllAvailableForToday()
  //     .subscribe(data => { this.mealDay = data[this.key].meals; this.menuId = data[this.key].id;
  //         console.log('Les plats du menu sélectionné sont: ');
  //       this.mealDay.forEach(element => {
  //         console.log(element.label);
  //         console.log('Prix: ' + element.priceDF);
  //       }); });
  // }

  menuDetail() {
    this.menuService.find(this.key)
      .subscribe(data => { this.mealDay = data.meals; this.menuId = data.id;
          console.log('Les plats du menu sélectionné sont: ');
      });
  }

    addToCart(mealId, slidingItem: IonItemSliding) {
      this.isModalOpened = true;
      if (slidingItem)
          slidingItem.close();
      console.log(mealId);
      this.menuService.find(mealId)
          .subscribe(
                async meal => { this.menuLabel = meal.label; localStorage.setItem('menu_' + mealId, meal.label + ' ' + mealId); },
                (error) => {},
                async () => {
                  const modal = await this.modalController.create({
                    component: ModalPage,
                    cssClass: 'my-modal',
                    componentProps: {
                      menuLabel: this.menuLabel
                    }
                  });
                  return await modal.present();
          });
    }
}
