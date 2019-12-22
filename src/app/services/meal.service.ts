import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals;

  meal;
  constructor(private http: HttpClient, private router: Router) { }

  // ------------------------------------------------------------------------------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\
  // -----------------------------------  ADMINISTRATEUR CANTINIERE SECURISE ------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\

  // ------------------------------------ Afficher tous les Plats



  findAllAvailableForToday(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/meal/findallavailablefortoday`, { responseType: 'json' })
      .pipe(
        tap(),
        catchError(this.handleError<any>('findAllAvailableForToday')),
      );
  }

  findOneMeal(idMeal: number) {
    return this.http.get<any>(`${environment.apiUrl}/meal/find/${idMeal}`)
      .pipe(
        tap(),
        catchError(this.handleError<any>('findAllAvailableForToday')),
      );
  }

  getAllMeals(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/meal/findall`)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('getFindAll')),
      );
  }

  // ------------------------------------  Ajouter un plat
  putAddmeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${environment.apiUrl}/meal/add`, meal)
      .pipe(
        tap((product: Meal) => console.log('meal edited')),
        catchError(this.handleError<Meal>('putAddmeal'))
      );
  }

  // ------------------------------------  Supprimer un plat
  deleteMeal(idMeal: number): Observable<Meal> {

    return this.http.put<Meal>(`${environment.apiUrl}/meal/delete/${idMeal}`, this.meal);
  }

  // ------------------------------------ Mettre à jour un Plat
  updateMeal(idMeal: number): Observable<Meal> {
    return this.http.patch<Meal>(`${environment.apiUrl}/meal/update/${idMeal}`, this.meal);
  }


  // ------------------------------------------------------------------------------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\
  // -----------------------------------  UTILISATEUR Consommateur  ---------------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\
  // ------------------------------------------------------------------------------------------------------------\\



  getOneMeal(idMeal: number): Observable<Meal> {
    return this.http.get<Meal>(`${environment.apiUrl}/meal/find/${idMeal}`);
  }

  getAllMealsCurrWeek(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${environment.apiUrl}/meal/findallavailablefortoday`);
  }
  getAllMealsSpecWeek(idWeek: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${environment.apiUrl}/meal/findallavailableforweek/${idWeek}`);
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

