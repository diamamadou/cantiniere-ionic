import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/user/register';
    return this.http.post(url, user, {responseType: 'json'})
        .pipe(
            tap( product => {console.log(product); console.log(user); }),
            catchError(this.handleError<any>('register'))
        );
  }

  logIn(user): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/login';
    return this.http.post(url, user, {observe: 'response'})
        .pipe(
            tap( token => {
              localStorage.setItem('user_token', token.headers.get('Authorization'));
              console.log('Vous ètes connectés'); }),
            catchError(this.handleError<any>('logIn')),
        );
  }

  logOut() {
    localStorage.removeItem('user_token');
  }

  forgotPassword(email): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/forgotpassword?email=' + email;
    return this.http.post(url, email)
        .pipe(
            tap( data => {  }),
            catchError(this.handleError<any>('forgotPassword')),
        );
  }

  getToken() {
    const token = localStorage.getItem('user_token');
    return token;
  }

  getDecodedToken(token) {
    try {
      return jwt_decode(token);
    } catch {
      return null;
    }
  }

  getUserInfo(token) {
    const user = this.getDecodedToken(token);
    return user;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }
}
