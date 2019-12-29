import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import set = Reflect.set;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
              console.log('Error 401');
            // this.authService.logOut();
            // location.reload(true);
          } else if (err.status === 403) {
              console.log('helpp');
              catchError(err);
          }
          const error = err.message || err.statusText;
          return throwError(error);
        })
      );
  }
}
