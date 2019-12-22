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


  findAllavailableForWeek(weekNumber): Observable<any> {
    const urlFindForWeek = 'http://localhost:8080/lunchtime/menu/findallavailableforweek'+"/" +weekNumber;
    return this.http.get(urlFindForWeek, {responseType: 'json'})
     .pipe(
       tap( menu => {
         ;
        }),
       catchError(this.handleError<any>('findForWeek')),
      );
  }



  find(menuId): Observable<any> {
    const urlFind = 'http://localhost:8080/lunchtime/menu/find'+"/" +menuId;
    return this.http.get(urlFind, {responseType: 'json'})
     .pipe(
       tap( menu => {
         ;
        }),
       catchError(this.handleError<any>('find')),
      );
  }


  findAll(): Observable<any> {
    const urlFindAll = 'http://localhost:8080/lunchtime/menu/findAll';
    return this.http.get(urlFindAll, {responseType: 'json'})
     .pipe(
       tap( menu => {
         ;
        }),
       catchError(this.handleError<any>('findAll')),
      );
  }


  deleteMenu(menuId): Observable<any> {
    const deleteUrl = '"http://localhost:8080/lunchtime/menu/delete' + "/" +menuId;
    return this.http.delete(deleteUrl, {responseType: 'json' })
      .pipe(
        tap(menu => {
          ;
        }),
        catchError(this.handleError<any>('delete')),
      );
  }


  addMenu(): Observable<any> {
    const addUrl = '"http://localhost:8080/lunchtime/menu/add';
    return this.http.delete(addUrl, {responseType: 'json' })
      .pipe(
        tap(menu => {
          ;
        }),
        catchError(this.handleError<any>('add')),
      );
  }


  updateMenu(menuId): Observable<any> {
    const deleteUrl = '"http://localhost:8080/lunchtime/menu/update' + "/" +menuId;
    return this.http.patch(deleteUrl,{responseType: 'json' })
      .pipe(
        tap(menu => {
          ;
        }),
        catchError(this.handleError<any>('update')),
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
