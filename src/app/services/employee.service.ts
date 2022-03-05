import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IEmployee} from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({EmployeeId: '', designationType: "", designationName: '', shortCode: "", status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(Employee:IEmployee): Observable<IEmployee> {
      return this.http.post<IEmployee>(environment.apiUrl + "api/Employee", Employee, this.httpOptions)
                      .pipe(catchError(this.handleError<IEmployee>(`addEmployee`)));
  }

  put(Employee:IEmployee, id: string): Observable<IEmployee> {
    return this.http.put<IEmployee>(environment.apiUrl + `api/Employee/${id}`, Employee, this.httpOptions)
                    .pipe(catchError(this.handleError<IEmployee>(`addEmployee`)));
  }

  find(): Observable<IEmployee[]> {
      return this.http.get<IEmployee[]>(environment.apiUrl + "api/Employee", this.httpOptions)
                      .pipe(catchError(this.handleError<IEmployee[]>('getAllEmployee', [])));
  }

  saveDetails(detail : IEmployee) {
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
