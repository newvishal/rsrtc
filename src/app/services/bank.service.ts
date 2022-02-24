import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }
  addBank(data:any): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      });
      const options = { headers: headers};
      return this.http.post(environment.apiUrl + "api/Bank", data,options)
          .pipe(
              retry(1),
              catchError(this.handleError)
          );
  }

  getAllBank(): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      });
      const options = { headers: headers};
      return this.http.get(environment.apiUrl + "api/Bank",options)
          .pipe(
              retry(1),
              catchError(this.handleError)
          );
  }
  handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }
}
