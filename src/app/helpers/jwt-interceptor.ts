import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

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
          'http://localhost:8080/lunchtime/meal/findallavailablefortoday',
          'http://localhost:8080/lunchtime/menu/findallavailablefortoday',
          'http://localhost:8080/lunchtime/meal/findallavailableforweek/',
          'http://localhost:8080/lunchtime/menu/findallavailableforweek/',
          'http://localhost:8080/lunchtime/menu/find/',
          'http://localhost:8080/lunchtime/meal/find/',
          'http://localhost:8080/lunchtime/user/register',
          'http://localhost:8080/lunchtime/forgotpassword',
          'http://localhost:8080/lunchtime/ingredient/find/',
          'http://localhost:8080/lunchtime/constraint/find/',
          'http://localhost:8080/lunchtime/constraint/findall',
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
