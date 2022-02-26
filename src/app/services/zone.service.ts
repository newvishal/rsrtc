import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {IZone} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({zoneId: '', zoneName: "", shortCode: '', status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(zone:IZone): Observable<IZone> {
      return this.http.post<IZone>(environment.apiUrl + "api/Zone", zone, this.httpOptions)
                      .pipe(catchError(this.handleError<IZone>(`addZone`)));
  }

  put(zone:IZone, id: string): Observable<IZone> {
    return this.http.put<IZone>(environment.apiUrl + `api/Zone/${id}`, zone, this.httpOptions)
                    .pipe(catchError(this.handleError<IZone>(`updateZone`)));
  }

  find(): Observable<IZone[]> {
      return this.http.get<IZone[]>(environment.apiUrl + "api/Zone", this.httpOptions)
                      .pipe(catchError(this.handleError<IZone[]>('getAllZone', [])));
  }

  saveDetails(detail : IZone) {
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
