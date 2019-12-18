import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         // throw new Error('Method not implemented.');
      const idToken = this.auth.getToken();
      const urlException1 = 'http://localhost:8080/lunchtime/meal/findallavailablefortoday';
      const urlException2 = 'http://localhost:8080/lunchtime/menu/findallavailablefortoday';

      if (idToken && req.url !== urlException1 && req.url !== urlException2) {
        const request = req.clone({
          headers: req.headers.set('Authorization', idToken)
        });

        return next.handle(request);
      } else {
        return next.handle(req);
      }
    }
}
