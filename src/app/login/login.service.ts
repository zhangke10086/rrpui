import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient
             ) {
  }
  login(username: string, pwd: string) {
    const Url = 'http://localhost:8081/login';
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
}
