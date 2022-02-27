import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IHRA} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class HRAService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({hraId: '', hraValue: "", status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(HRA:IHRA): Observable<IHRA> {
      return this.http.post<IHRA>(environment.apiUrl + "api/HRA", HRA, this.httpOptions)
                      .pipe(catchError(this.handleError<IHRA>(`addHRA`)));
  }

  put(designation:IHRA, id: string): Observable<IHRA> {
    return this.http.put<IHRA>(environment.apiUrl + `api/HRA/${id}`, designation, this.httpOptions)
                    .pipe(catchError(this.handleError<IHRA>(`editHRA`)));
  }

  find(): Observable<IHRA[]> {
      return this.http.get<IHRA[]>(environment.apiUrl + "api/HRA", this.httpOptions)
                      .pipe(catchError(this.handleError<IHRA[]>('getAllHRA', [])));
  }

  saveDetails(detail : IHRA) {
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
