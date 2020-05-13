import { Injectable } from '@angular/core';
import {UrlService} from '../../../core/service/url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpglService {

  constructor(private http: HttpClient,
              private url: UrlService) { }
  //动态查询
  query(data) {
    const url = this.url.hostname + '/approval/QueryApproval';
    return new Promise(((resolve, reject) =>
      this.http.post(url, data)
        .toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      })));
  }
}
