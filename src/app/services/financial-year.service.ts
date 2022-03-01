import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {IFinancialYear} from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class FinancialYearService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({fyId: '', financialYear: "", shortCode: '', fyFrom: "", fyTo: '', status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(FinancialYear:IFinancialYear): Observable<IFinancialYear> {
      return this.http.post<IFinancialYear>(environment.apiUrl + "api/FinancialYear", FinancialYear, this.httpOptions)
                      .pipe(catchError(this.handleError<IFinancialYear>(`addFinancialYear`)));
  }

  put(FinancialYear:IFinancialYear, id: string): Observable<IFinancialYear> {
    return this.http.put<IFinancialYear>(environment.apiUrl + `api/FinancialYear/${id}`, FinancialYear, this.httpOptions)
                    .pipe(catchError(this.handleError<IFinancialYear>(`putFinancialYear`)));
  }

  find(): Observable<IFinancialYear[]> {
      return this.http.get<IFinancialYear[]>(environment.apiUrl + "api/FinancialYear", this.httpOptions)
                      .pipe(catchError(this.handleError<IFinancialYear[]>('getAllFinancialYear', [])));
  }

  saveDetails(detail : IFinancialYear) {
    localStorage.setItem('details', JSON.stringify(detail));
    this.subject.next(detail);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
