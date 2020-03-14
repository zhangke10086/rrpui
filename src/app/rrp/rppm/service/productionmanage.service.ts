import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../../core/service/url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductionmanageService {

  constructor(   public url: UrlService,
                 private http: HttpClient) { }
  get(): any {
    const url = this.url.hostname + '/findAll';
    return new Promise((resolve, reject) => {
      this.http.get(url).toPromise().then(res => {
        // TODO 成功返回的回调
        resolve(res);
      }, res => {
        // TODO 返回出错的回调
        reject(false);
      });
    });
  }
  // post方法
  post(body): any {
    const url = this.url.hostname + '/findAll';
    return new Promise((resolve, reject) => {
      this.http.post(url, body).toPromise().then(res => {
        // TODO 成功返回的回调
        resolve(res);
      }, res => {
        // TODO 返回出错的回调
        reject(false);
      });
    });
  }
}
