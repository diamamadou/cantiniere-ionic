import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //Get ALL Ingredients
getIngredients(): Observable<any>{
  return this.http.get<any>(environment.apiUrl + '/ingredient/findall')
  .pipe(
    tap(_ => this.log('Recuperation Ingredients')),        
      catchError(this.handleError<any>('getIngredients', []))
  );
}

//Get Ingredients ID, Return Undefined when id not found 
getHeroNo404<Data>(id: number): Observable<any> {
const url = '${this.ingredientUrl}/?id=${id}';
return this.http.get<any>(url)
.pipe(
  map(Ingredients => Ingredients[0]),
  tap(h => {
    const outcome = h ? 'fetched' : 'did not find';
    this.log('${outcome) hero id=${id}');
  }),
  catchError(this.handleError<any>('Get Ingredients = ${id}'))
);
}

//Get One Ingredient
getIngredient(id: number): Observable<any> {
const url = `${environment.apiUrl}/${id}`;
return this.http.get<any>(url).pipe(
  tap(_ => this.log(`Recuperation ingredient id=${id}`)),
  catchError(this.handleError<any>('Get Ingredients id = ${id}'))
);
}

//////// Save methods //////////

//ADD Ingredients
Add(Ingredient): Observable<any> {
return this.http.post<any>(environment.apiUrl, Ingredient, this.httpOptions).pipe(
 tap((newIngredient) => this.log(`Add New Hero id=${newIngredient.id}`)),
 catchError(this.handleError<any>('AddHero'))
);
}

/** DELETE Ingredients */
delete(Ingredient: number): Observable<any> {
const id = typeof Ingredient === 'number' ? Ingredient : Ingredient;
const url = '${environment.apiUrl}/${id}';

return this.http.delete<any>(url, this.httpOptions).pipe(
  tap(_ => this.log('delete hero id=${id}')),
  catchError(this.handleError<any>('deleteIngredient'))
);
}

/*UPDATE */
update(Ingredient): Observable<any> {
return this.http.put(environment.apiUrl, Ingredient, this.httpOptions).pipe(
  tap(_ => this.log('updated ingredient id =${ingredient.id}')),
  catchError(this.handleError<any>('updateIngredient'))
);
}


private handleError<T> (operation = 'operation', result? : T){
  return (error: any): Observable<T> => {
    
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

     // TODO: better job of transforming error for user consumption
     this.log(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
     return (error);
  };
}

 /** Log a HeroService message with the MessageService */
 private log(message: string) {
}
}
