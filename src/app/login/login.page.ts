import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(user) {
    this.authService.logIn(user.form.value)
        .subscribe(users => { this.users = users; console.log(localStorage.getItem('user_token')); },
            error => { this.router.navigate(['/todays-meal']); },
            () => { this.router.navigate(['/meal']); }
        );
    const   hello = this.authService.getDecodedToken(localStorage.getItem('user_token'));
    console.log(hello);
  }
}
