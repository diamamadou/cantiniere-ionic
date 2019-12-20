import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  todayMenu;
  deleteMenu = [];
  addMenu;
  updateMenu
  findAllMenu;
  findMenu;
  findMenuForWeeks;
  todayMeal = [];
  key;
  errors;
  userInfo;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.route.params
      .subscribe(params => this.key = params);
  }

  ngOnInit() {
    this.getAllForToday();
  }

  getAllForToday() {
    this.menuService.findAllAvailableForToday()
      .subscribe(data => {
      this.todayMenu = data; console.log('Les menus du jour sont : ');
        data.forEach(element => {
          // this.todayMeal = element.meals;
          console.log(element.label + '  Prix: ' + element.priceDF);
        })
          ;
      });
    this.menuService.findAllAvailableForToday()
      .subscribe(data => this.todayMeal = data);
    if (this.authService.getToken() !== null) {
      this.userInfo = this.authService.getUserInfo(this.authService.getToken());
      console.log('Bienvenue ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
    }
  }

  menuDetail(id) {
    this.menuService.findAllAvailableForToday()

      .subscribe(data => {
      this.todayMeal = data[id]; // console.log(data[id]);
      },
        error => { this.errors = error; },
        () => { this.router.navigate(['/detail-menu-jour/' + id]); }
      );
  }

}

this.menuService.deleteMenu()
  .subscribe(data => this.deleteMenu = data);
if (this.authService.getToken() !== null) {
  this.userInfo = this.authService.getUserInfo(this.authService.getToken());
  console.log('Bienvenue ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
}


this.menuService.addMenu()
  .subscribe(data => this.addMenu = data);
if (this.authService.getToken() !== null) {
  this.userInfo = this.authService.getUserInfo(this.authService.getToken());
  console.log('Bienvenue ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
}


this.menuService.updateMenu()
  .subscribe(data => this.updateMenu = data);
if (this.authService.getToken() !== null) {
  this.userInfo = this.authService.getUserInfo(this.authService.getToken());
  console.log('Update ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
}


this.menuService.deleteMenu()
      .subscribe(data => this.deleteMenu = data);
    if (this.authService.getToken() !== null) {
      this.userInfo = this.authService.getUserInfo(this.authService.getToken());
      console.log('delete' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
    }

this.menuService.findAllMenu()
.subscribe(data => this.findAllMenu = data);
if (this.authService.getToken() !== null) {
this.userInfo = this.authService.getUserInfo(this.authService.getToken());
console.log('findAll ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
}


/*this.menuService.findAllMenu()
.subscribe(data => this.findAllMenu = data);
if (this.authService.getToken() !== null) {
this.userInfo = this.authService.getUserInfo(this.authService.getToken());
console.log('findAll ' + this.userInfo.user.name + ' ' + this.userInfo.user.firstname + '');
}*/