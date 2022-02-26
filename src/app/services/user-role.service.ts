import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IUserRole } from '../shared/ts';
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({roleName: '', roleId: "", status: false }));
  
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }

  addUserRole(bank:IUserRole): Observable<IUserRole> {
    return this.http.post<IUserRole>(environment.apiUrl + "api//api/UserRole", bank, this.httpOptions)
                    .pipe(catchError(this.handleError<IUserRole>(`addUserRole`)));
  }

  put(bank:IUserRole, id: string): Observable<IUserRole> {
    return this.http.put<IUserRole>(environment.apiUrl + `api/UserRole/${id}`, bank, this.httpOptions)
                    .pipe(catchError(this.handleError<IUserRole>(`addUserRole`)));
  }

  getAllUserRole(): Observable<IUserRole[]> {
      return this.http.get<IUserRole[]>(environment.apiUrl + "api/UserRole", this.httpOptions)
                      .pipe(catchError(this.handleError<IUserRole[]>('getAllUserRole', [])));
  }

  saveUserRoleById(detail : IUserRole) {
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
