import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         // throw new Error('Method not implemented.');
      const idToken = this.auth.getToken();

      if (idToken && !this.noAuthorizationNeeded(req)) {
        const request = req.clone({
          headers: req.headers.set('Authorization', idToken)
        });

        return next.handle(request);
      } else {
        return next.handle(req);
      }

    }

    private noAuthorizationNeeded(req) {
      const urls = [
          environment.apiUrl + '/meal/findallavailablefortoday',
          environment.apiUrl + '/menu/findallavailablefortoday',
          environment.apiUrl + '/meal/findallavailableforweek/',
          environment.apiUrl + '/menu/findallavailableforweek/',
          environment.apiUrl + '/menu/find/',
          environment.apiUrl + '/meal/find/',
          environment.apiUrl + '/user/register',
          environment.apiUrl + '/forgotpassword',
          environment.apiUrl + '/ingredient/find/',
          environment.apiUrl + '/constraint/find/',
          environment.apiUrl + '/constraint/findall',
      ];

      let nonProtectedUrl = null;
      urls.forEach(url => {
        if (req.url.indexOf(url) > -1) {
          nonProtectedUrl = req.url;
        }
      });

      return nonProtectedUrl;
    }
}
