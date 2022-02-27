import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {ILeaveReasonType} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class LeaveReasonTypeService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({leaveReasonTypeId: '', reasonType: "", shortCode: '', status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(LeaveReasonType:ILeaveReasonType): Observable<ILeaveReasonType> {
      return this.http.post<ILeaveReasonType>(environment.apiUrl + "api/LeaveReasonType", LeaveReasonType, this.httpOptions)
                      .pipe(catchError(this.handleError<ILeaveReasonType>(`addLeaveReasonType`)));
  }

  put(LeaveReasonType:ILeaveReasonType, id: string): Observable<ILeaveReasonType> {
    return this.http.put<ILeaveReasonType>(environment.apiUrl + `api/LeaveReasonType/${id}`, LeaveReasonType, this.httpOptions)
                    .pipe(catchError(this.handleError<ILeaveReasonType>(`putLeaveReasonType`)));
  }

  find(): Observable<ILeaveReasonType[]> {
      return this.http.get<ILeaveReasonType[]>(environment.apiUrl + "api/LeaveReasonType", this.httpOptions)
                      .pipe(catchError(this.handleError<ILeaveReasonType[]>('getLeaveReasonType', [])));
  }

  saveDetails(detail : ILeaveReasonType) {
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
