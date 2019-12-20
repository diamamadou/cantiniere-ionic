import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private http: HttpClient, private router: Router) { }
  credit(id,amount): Observable<any> {
    const montant = "amount="+amount;
    console.log(montant);
    const url = 'http://localhost:8080/lunchtime/user/credit/'+id+'?'+montant;
    return this.http.post(url, {responseType: 'json'})
     .pipe(
       tap( credit => {
         ;
        }),
       catchError(this.handleError<any>('credit')),
      );
  }

  // delete(id): Observable<any> {
  //   const url = 'http://localhost:8080/lunchtime/user/delete/'+id;
  //   return this.http.delete(url, {responseType: 'json'})
  //    .pipe(
  //      tap( credit => {
  //        ;
  //       }),
  //      catchError(this.handleError<any>('delete')),
  //     );
  // }

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
