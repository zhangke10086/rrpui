import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SoftwareUpgrade, Response} from '../entity/entity';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class SoftwareUpdateService {
  response: Response;
  private softwareUpgradeListUrl = 'http://localhost:8080/softwareUpgrade/getSoftwareUpgrade';
  private softwareUpgradeListByIdUrl = 'http://localhost:8080/softwareUpgrade/getSoftwareUpgradeById';
  private softwareUpgradeDeleteUrl = 'http://localhost:8080/softwareUpgrade/deleteById';
  private softwareUpgradeUpdateUrl = 'http://localhost:8080/softwareUpgrade/updateSoftwareUpgrade';
  private softwareUpgradeAddteUrl = 'http://localhost:8080/softwareUpgrade/addSoftwareUpgrade';
  constructor(private http: HttpClient) { }

  /** DELETE: detail the softwareUpgrade from the server */
  deleteSoftwareUpgrade(softwareUpgrade: SoftwareUpgrade | number): Observable<Response> {
    const id = typeof softwareUpgrade === 'number' ? softwareUpgrade : softwareUpgrade.id;
    return this.http.post<Response>(this.softwareUpgradeDeleteUrl, id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteSoftwareUpgrade'))
    );
  }

  /** GET softwareUpgrades from the server */
  getSoftwareUpgrades(): Observable<Response> {
    return this.http.get<Response>(this.softwareUpgradeListUrl)
      .pipe(
        catchError(this.handleError<Response>('getSoftwareUpgrades'))
      );
  }

  /** GET softwareUpgrade by id. Will 404 if id not found */
  getSoftwareUpgrade(id: number): Observable<Response> {
    const url = this.softwareUpgradeListByIdUrl + '?id=' + id;
    return this.http.get<Response>(url).pipe(
      catchError(this.handleError<Response>(`getSoftwareUpgrade id=${id}`))
    );
  }
  /** POST: add a new softwareUpgrade to the server */
  addSoftwareUpgrade(softwareUpgrade: { description: string; }): Observable<Response> {
    return this.http.post<Response>(this.softwareUpgradeAddteUrl, softwareUpgrade, httpOptions).pipe(
      catchError(this.handleError<any>('addSoftwareUpgrade'))
    );
  }
  /** PUT: update the hero on the server */
  updateSoftwareUpgrade(softwareUpgrade: SoftwareUpgrade): Observable<Response> {
    return this.http.put<Response>(this.softwareUpgradeUpdateUrl, softwareUpgrade, httpOptions).pipe(
      catchError(this.handleError<Response>('updateSoftwareUpgrade'))
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
