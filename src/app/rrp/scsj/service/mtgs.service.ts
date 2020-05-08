import { Injectable } from '@angular/core';
import {Response} from '../../../core/entity/entity';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from '../../../core/service/url.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MtgsService {
  response: Response;
  private benchCountListUrl = this.url.hostname + '/benchCount/getBenchCount';
  private benchCountListByIdUrl = this.url.hostname + '/benchCount/getBenchCountById';
  constructor(private http: HttpClient , private url: UrlService) { }


  /** GET benchCounts from the server */
  // tslint:disable-next-line:variable-name
  getBenchCounts(date_begin: string, date_end: string): Observable<Response> {
    return this.http.get<Response>(this.benchCountListUrl + '?date_begin=' + date_begin + '&date_end=' + date_end)
      .pipe(
        catchError(this.handleError<Response>('getBenchCounts'))
      );
  }
/** GET benchCounts from the server */
  // tslint:disable-next-line:variable-name
  getBenchCount(time: string): Observable<Response> {
    return this.http.get<Response>(this.benchCountListByIdUrl + '?time=' + time)
      .pipe(
        catchError(this.handleError<Response>('getBenchCount'))
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
