import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private http: HttpClient,
              private loginService: LoginService) {}

  login() {
    this.loginService.login(this.validateForm.value.username, this.validateForm.value.password).then((res: any) => {
      if (res.state === 200) {
        this.message.success('欢迎' + res.data.name + '登陆成功,请稍后...');
        localStorage.setItem('userinfo', JSON.stringify(res.data));
        setTimeout(() => {
          this.router.navigate(['/index']);
        });
      } else {
        this.message.warning('用户名或密码错误');
      }
    }, err => {
      this.message.warning('登陆失败');
    });
  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
