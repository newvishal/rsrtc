import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {IMonth} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({districtId: '', zoneId: "", districtName: '', shortCode: "", status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(Month:IMonth): Observable<IMonth> {
      return this.http.post<IMonth>(environment.apiUrl + "api/Month", Month, this.httpOptions)
                      .pipe(catchError(this.handleError<IMonth>(`addMonth`)));
  }

  put(Month:IMonth, id: string): Observable<IMonth> {
    return this.http.put<IMonth>(environment.apiUrl + `api/Month/${id}`, Month, this.httpOptions)
                    .pipe(catchError(this.handleError<IMonth>(`putMonth`)));
  }

  find(): Observable<IMonth[]> {
      return this.http.get<IMonth[]>(environment.apiUrl + "api/Month", this.httpOptions)
                      .pipe(catchError(this.handleError<IMonth[]>('getAllMonth', [])));
  }

  saveDetails(detail : IMonth) {
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
