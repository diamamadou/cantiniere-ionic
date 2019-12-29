import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userInfos;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.userInfos = this.authService.getUserInfo(this.authService.getToken());
    if (this.userInfos) {
      console.log('Vous ètes connectés en tant que ' + this.userInfos.user.name);
    }
  }

  login(user) {
    this.authService.logIn(user.form.value)
        .subscribe(users => { },
            error => { this.router.navigate(['/login']); },
            () => { this.userInfos = this.authService.getUserInfo(this.authService.getToken()); console.log('Vous ètes connectés'); }
        );
  }

  logOut() {
    this.authService.logOut();
    console.log('Vous ètes déconnectés');
    this.userInfos = null;
  }
}
