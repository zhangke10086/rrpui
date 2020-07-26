import {Injectable} from '@angular/core';
import {Response, Trouble} from '../../../core/entity/entity';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from '../../../core/service/url.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class YxsjtjService {
  response: Response;
  private runListUrl = this.url.hostname + '/run/getRun';
  private runByCompanyListUrl = this.url.hostname + '/run/getRunByCompany';
  private runListByIdUrl = this.url.hostname + '/run/getRunById';
  private troubleListUrl = this.url.hostname + '/trouble/getTrouble';
  private troubleListByIdUrl = this.url.hostname + '/trouble/getTroubleById';
  private troubleDeleteUrl = this.url.hostname + '/trouble/deleteById';
  private troubleUpdateUrl = this.url.hostname + '/trouble/updateTrouble';
  private troubleAddteUrl = this.url.hostname + '/trouble/addTrouble';

  constructor(private http: HttpClient, private url: UrlService) {
  }


  /** GET runs from the server */
  // tslint:disable-next-line:variable-name
  getRunsByCompany(company_id: number, date_begin: string, date_end: string): Observable<Response> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Response>(this.runByCompanyListUrl + '?company_id=' + company_id + '&date_begin=' + date_begin + '&date_end=' + date_end)
      .pipe(
        catchError(this.handleError<Response>('getRunsByCompany'))
      );
  }

  /** GET runs from the server */
  // tslint:disable-next-line:variable-name
  getRuns(date_begin: string, date_end: string): Observable<Response> {
    return this.http.get<Response>(this.runListUrl + '?date_begin=' + date_begin + '&date_end=' + date_end)
      .pipe(
        catchError(this.handleError<Response>('getRuns'))
      );
  }

  /** GET runs from the server */
  // tslint:disable-next-line:variable-name
  getRun(time: string): Observable<Response> {
    return this.http.get<Response>(this.runListByIdUrl + '?time=' + time)
      .pipe(
        catchError(this.handleError<Response>('zgetRun'))
      );
  }
  /** DELETE: detail the trouble from the server */
  deleteTrouble(trouble: Trouble | number): Observable<Response> {
    const id = typeof trouble === 'number' ? trouble : trouble.id;
    return this.http.post<Response>(this.troubleDeleteUrl, id, httpOptions).pipe(
      catchError(this.handleError<Response>('deleteTrouble'))
    );
  }

  /** GET troubles from the server */
  getTroubles(): Observable<Response> {
    return this.http.get<Response>(this.troubleListUrl)
      .pipe(
        catchError(this.handleError<Response>('getTroubles'))
      );
  }

  /** GET trouble by id. Will 404 if id not found */
  getTrouble(id: number): Observable<Response> {
    const url = this.troubleListByIdUrl + '?id=' + id;
    return this.http.get<Response>(url).pipe(
      catchError(this.handleError<Response>(`getTrouble id=${id}`))
    );
  }
  query(data) {
    const url = this.url.hostname + '/trouble/QueryTrouble';
    return new Promise(((resolve, reject) =>
      this.http.post(url, data)
        .toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      })));
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
