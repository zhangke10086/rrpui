import { Injectable } from '@angular/core';
import {UrlService} from '../../core/service/url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuerylistService {

  constructor(private http: HttpClient,
              private url: UrlService) { }
  getCompany() {
    const url = this.url.hostname + '/company/findAllCompany';
    return new Promise(((resolve, reject) =>
      this.http.get(url)
        .toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      })));
  }
//根据企业id获取机器人
  getRobot(id) {
    const url = this.url.hostname + '/robot/findAllByCompany?id=';
    return new Promise(((resolve, reject) =>
      this.http.get(url + id)
        .toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      })));
  }
}
