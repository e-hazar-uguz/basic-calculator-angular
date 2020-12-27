import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  path = 'http://api.mathjs.org/v4/';

constructor(private http: HttpClient) { }

  calculate(formula: String): Observable<any> {
    return this.http.post<any>(this.path, JSON.stringify({"expr":[formula]})
    ).pipe(
      tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occured .. ' + err.error.message;
    } else {
      errorMessage = 'An error occured by System ..';
    }
    return throwError(errorMessage);
  }

}
