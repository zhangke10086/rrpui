import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Warning, Response} from '../entity/entity';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class WarningService {
  response: Response;
  private warningListUrl = 'http://localhost:8080/warning/getWarning';
  private warningListByIdUrl = 'http://localhost:8080/warning/getWarningById';
  private warningDeleteUrl = 'http://localhost:8080/warning/deleteById';
  private warningUpdateUrl = 'http://localhost:8080/warning/updateWarning';
  private warningAddteUrl = 'http://localhost:8080/warning/addWarning';
  constructor(private http: HttpClient) { }

  /** DELETE: detail the warning from the server */
  deleteWarning(warning: Warning | number): Observable<Response> {
    const id = typeof warning === 'number' ? warning : warning.id;
    return this.http.post<Response>(this.warningDeleteUrl, id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteWarning'))
    );
  }

  /** GET warnings from the server */
  getWarnings(): Observable<Response> {
    return this.http.get<Response>(this.warningListUrl)
      .pipe(
        catchError(this.handleError<Response>('getWarnings'))
      );
  }

  /** GET warning by id. Will 404 if id not found */
  getWarning(id: number): Observable<Response> {
    const url = this.warningListByIdUrl + '?id=' + id;
    return this.http.get<Response>(url).pipe(
      catchError(this.handleError<Response>(`getWarning id=${id}`))
    );
  }
  /** POST: add a new warning to the server */
  addWarning(warning: Warning): Observable<Response> {
    return this.http.post<Response>(this.warningAddteUrl, warning, httpOptions).pipe(
      catchError(this.handleError<any>('addWarning'))
    );
  }
  /** PUT: update the hero on the server */
  updateWarning(warning: Warning): Observable<Response> {
    return this.http.put<Response>(this.warningUpdateUrl, warning, httpOptions).pipe(
      catchError(this.handleError<Response>('updateWarning'))
    );
  }
  /**
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
