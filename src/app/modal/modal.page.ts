import {Component, Input, OnInit} from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import * as moment from 'moment';

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
  @Input() deliveredAndPayed;
  @Input() orderCanceled;
  @Input() btnLabel;

  beginDate;
  endDate;
  status;
  userId;
  filterObject;

  constructor(
      navParams: NavParams,
      private modalController: ModalController,
      private router: Router,
  ) {}
  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
    if (this.deliveredAndPayed || this.orderCanceled) {
      this.router.navigate(['/order']);
    }
  }

  openCart() {
    this.router.navigate(['/cart']);
    this.modalController.dismiss();
  }

  openFilterModal(filter) {
    this.beginDate = moment(this.beginDate).format('DD-MM-YYYY');
    this.endDate = moment(this.endDate).format('DD-MM-YYYY');

    if (filter === 'entre_dates') {
      this.filterObject = {
        filter,
        begin_date: this.beginDate,
        end_date: this.endDate,
        status: this.status
      };
    } else if (filter === 'par_utilisateur' || filter === 'aujourdhui_utilisateur') {
      this.filterObject = {
        filter,
        user_id: this.userId
      };
    }

    this.router.navigate(['/order'], {
      queryParams: this.filterObject
    });

    this.closeModal();
  }

}
