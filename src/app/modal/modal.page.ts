import {Component, Input, OnInit} from '@angular/core';
import {NavParams, NavController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() name: string;
  @Input() email;
  @Input() mealLabel;
  @Input() menuLabel;

  constructor(navParams: NavParams, private modalController: ModalController, private router: Router) {
    // console.log(navParams.get('name'));

  }
  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  openCart() {
    this.router.navigate(['/cart']);
    this.modalController.dismiss();
  }

}