import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from "../core/service/url.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private url: UrlService
             ) {
  }
  login(username: string, pwd: string) {
    const Url = this.url.hostname + '/login';
    const body = new FormData();
    body.set('username', username);
    body.set('password', pwd);

    return new Promise(((resolve, reject) =>
      this.http.post(Url, body).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      })
    ));
  }
  remind(companyid) {
    const Url = this.url.hostname + '/remind/findByCompanyid';
    return new Promise(((resolve, reject) =>
        this.http.post(Url, companyid).toPromise().then(res => {
          resolve(res);
        }, error => {
          reject(error);
        })
    ));
  }
}
