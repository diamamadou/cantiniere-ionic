import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(): Observable <any> {
    const order = {
      constraintId : -1,
      menuId : 2,
      quantityMeals: [
        {mealId: 9,
          quantity: 1
        }
      ],
      userId: 1
    };
    // const order =
    const url = 'http://localhost:8080/lunchtime/order/add';
    return this.http.put(url, order, {responseType: 'json'})
        .pipe(
            tap(orderObject => {},
                (err) => { console.log('erreur !'); })
        );
  }

  cancelOrder(orderId): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/order/cancel/' + orderId;
    return this.http.patch(url, {responseType: 'json'})
        .pipe(
            tap(data => {
                },
                (err) => {console.log('erreur !'); })
        );
  }

  computePrice(orderId, constraintId): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/order/computeprice/' + orderId + '/' + constraintId;
    return this.http.get(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  deliveryAndPay(orderId, constraintId): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/order/deliverandpay/' + orderId + '/' + constraintId;
    return this.http.patch(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  getOrder(orderId): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/order/find/' + orderId;
    return this.http.get(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  findAll(): Observable<any> {
    const url = 'http://localhost:8080/lunchtime/order/findall';
    return this.http.get(url, {responseType: 'json'})
        .pipe(
            tap(data => {},
                (err) => {console.log('Erreur !'); })
        );
  }

  findAllBetweenInStatus(beginDate, endDate, status): Observable<any> {
    const dateDebut = 'beginDate=' + beginDate;
    const dateFin = 'endDate=' + endDate;
    const statu = 'status=' + status;
    const url = 'http://localhost:8080/lunchtime/order/findallbetweendateinstatus?' + dateDebut + '&' + dateFin + '&' + statu;
    return this.http.get(url)
        .pipe(
            tap(data => {},
                (err) => { console.log('Erreur !'); })
        );
  }

  handleErr(error: Response) {
    if (error.status === 412) {
      // this.router.navigate(['/login']);
      console.log('error412');
    } else {
      console.log(error.status);
      return Observable.throw(error);
    }
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
