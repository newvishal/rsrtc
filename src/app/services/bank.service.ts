import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IBank} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  addBank(data:IBank): Observable<IBank> {
      return this.http.post<IBank>(environment.apiUrl + "api/Bank", data, this.httpOptions)
                      .pipe(catchError(this.handleError<IBank>(`addBank`)));
  }

  getAllBank(): Observable<IBank[]> {
      return this.http.get<IBank[]>(environment.apiUrl + "api/Bank", this.httpOptions)
                      .pipe(catchError(this.handleError<IBank[]>('getAllBank', [])));
  }
  
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
