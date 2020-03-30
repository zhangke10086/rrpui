import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private loginUrl: string) {
    this.loginUrl = 'http://localhost:8081/login';
  }
  login(username: string, pwd: string) {
    const body = new FormData();
    body.set('username', username);
    body.set('password', pwd);

    return new Promise(((resolve, reject) =>
      this.http.post(this.loginUrl, body).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      })
    ));
  }
}
