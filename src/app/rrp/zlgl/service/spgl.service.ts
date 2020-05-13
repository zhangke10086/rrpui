import { Injectable } from '@angular/core';
import {UrlService} from '../../../core/service/url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpglService {

  constructor(private http: HttpClient,
              private url: UrlService) { }
  // 动态查询
  query(data) {
    const url = this.url.hostname + '/approval/QueryApproval';
    return this.post(url, data);
  }

  // 确认
  confirm(data) {
    const url = this.url.hostname + '/approval/confirm';
    return this.post(url, data);
  }

  reject(data) {
    const url = this.url.hostname + '/approval/reject';
    return this.post(url, data);
  }
  post(url, data) {
    return new Promise(((resolve, reject) =>
      this.http.post(url, data)
        .toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      })));
  }
}
