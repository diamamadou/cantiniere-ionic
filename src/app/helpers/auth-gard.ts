import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGard implements CanActivate  {
  constructor(private router: Router) {
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('user_token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('vous n\'ètes pas connectés');
      return false;
    }
  }
}
