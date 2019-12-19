import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, private router: Router) { }
  findAllAvailableForToday(): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/menu/findallavailablefortoday';
    return this.http.get(url, {responseType: 'json'})
     .pipe(
       tap( menu => {
         ;
        }),
       catchError(this.handleError<any>('findAllAvailableForToday')),
      );
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
