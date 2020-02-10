import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(order): Observable <any> {
    const url = environment.apiUrl + '/order/add';
    return this.http.put(url, order, {responseType: 'json'})
        .pipe(
            tap(orderObject => {},
                (err) => { console.log('erreur !'); })
        );
  }

  cancelOrder(orderId): Observable<any> {
    const url = environment.apiUrl + '/order/cancel/' + orderId;
    return this.http.patch(url, {responseType: 'json'})
        .pipe(
            tap(data => {
                },
                (err) => {console.log('erreur !'); })
        );
  }

  computePrice(orderId, constraintId): Observable<any> {
    const url = environment.apiUrl + '/order/computeprice/' + orderId + '/' + constraintId;
    return this.http.get(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  deliveryAndPay(orderId, constraintId): Observable<any> {
    const url = environment.apiUrl + '/order/deliverandpay/' + orderId + '/' + constraintId;
    return this.http.patch(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  getOrder(orderId): Observable<any> {
    const url = environment.apiUrl + '/order/find/' + orderId;
    return this.http.get(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  findAll(): Observable<any> {
    const url = environment.apiUrl + '/order/findall';
    return this.http.get(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  findAllBetweenInStatus(beginDate, endDate, status): Observable<any> {
    const dateDebut = 'beginDate=' + beginDate;
    const dateFin = 'endDate=' + endDate;
    const statut = 'status=' + status;
    const url = environment.apiUrl + '/order/findallbetweendateinstatus?' + dateDebut + '&' + dateFin + '&' + statut;
    return this.http.get(url)
        .pipe(
            tap(data => {},
                (err) => { console.log('Erreur !'); })
        );
  }

  findAllForUser(userId): Observable<any> {
    const url = environment.apiUrl + '/order/findallforuser/' + userId;
    return this.http.get(url)
        .pipe(
            tap(data => {},
                (err) => { console.log('Erreur !'); })
        );
  }

  findAllForUserToday(userId): Observable<any> {
    const url = environment.apiUrl + '/order/findallforusertoday/' + userId;
    return this.http.get(url)
        .pipe(
            tap(data => {},
                (err) => { console.log('Erreur !'); })
        );
  }

  updateOrder(orderId, order): Observable<any> {
    const url = environment.apiUrl + '/order/update/' + orderId;
    return this.http.patch(url, order)
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //  console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return (error);
      return throwError(error);
    };
  }
}
