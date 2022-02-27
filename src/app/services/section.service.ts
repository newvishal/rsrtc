import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {ISection} from '../shared/ts';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  subject = new BehaviorSubject<any>( localStorage.getItem('details') || JSON.stringify({sectionId: '', sectionName: "", shortCode: '', status: false }));

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
   }),
  };

  constructor(private http: HttpClient) { }
   
  add(Section:ISection): Observable<ISection> {
      return this.http.post<ISection>(environment.apiUrl + "api/Section", Section, this.httpOptions)
                      .pipe(catchError(this.handleError<ISection>(`addSection`)));
  }

  put(Section:ISection, id: string): Observable<ISection> {
    return this.http.put<ISection>(environment.apiUrl + `api/Section/${id}`, Section, this.httpOptions)
                    .pipe(catchError(this.handleError<ISection>(`editSection`)));
  }

  find(): Observable<ISection[]> {
      return this.http.get<ISection[]>(environment.apiUrl + "api/Section", this.httpOptions)
                      .pipe(catchError(this.handleError<ISection[]>('getAllSection', [])));
  }

  saveDetails(detail : ISection) {
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
