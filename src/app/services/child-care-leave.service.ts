import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IChildCareLeave } from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class ChildCareLeaveService {
  subject = new BehaviorSubject<any>(localStorage.getItem('details') || JSON.stringify({ mPleaveId: '', leaveType: "", gender: '',maxLeaveAllowed:'', tillChildAge:'',status: false }));

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }),
  };

  constructor(private http: HttpClient) { }

  addChildCareLeave(bank: IChildCareLeave): Observable<IChildCareLeave> {
    return this.http.post<IChildCareLeave>(environment.apiUrl + "api/ChildCareLeave", bank, this.httpOptions)
      .pipe(catchError(this.handleError<IChildCareLeave>(`addChildCareLeave`)));
  }

  put(bank: IChildCareLeave, id: string): Observable<IChildCareLeave> {
    return this.http.put<IChildCareLeave>(environment.apiUrl + `api/ChildCareLeave/${id}`, bank, this.httpOptions)
      .pipe(catchError(this.handleError<IChildCareLeave>(`addChildCareLeave`)));
  }

  getAllChildCareLeave(): Observable<IChildCareLeave[]> {
    return this.http.get<IChildCareLeave[]>(environment.apiUrl + "api/ChildCareLeave", this.httpOptions)
      .pipe(catchError(this.handleError<IChildCareLeave[]>('getAllChildCareLeave', [])));
  }

  saveDetails(detail: IChildCareLeave) {
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
