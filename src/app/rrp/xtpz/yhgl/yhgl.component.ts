import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {YhglService} from '../service/yhgl.service';
import {Location} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd';
declare var $: any;

@Component({
  selector: 'app-yhgl',
  templateUrl: './yhgl.component.html',
  styleUrls: ['./yhgl.component.css']
})
export class YhglComponent implements OnInit {
  isVisible = false;
  isVisible1 = false;
  deleteVisible = false;
  resetVisible = false;
  // des = '';
  private user: any;
  private users: [];
  private companies: [];
  private company: any;
  private role: any;
  private roles: [];

  ngOnInit() {
    this.getUsers();
    this.getCompanies();
    this.getRoles();
  }

  constructor(
    private yhglService: YhglService,
    private route: ActivatedRoute,
    private location: Location,
    private message: NzMessageService
  ) { }

   // $(function(){
   //      $('#ss').click(function(){
   //           var sstxt=$('#filtertxt').val();
   //           $("table tbody tr").hide().filter(":contains('"+sstxt+"')").show();
   //        });
   //   });
  search(): void {
    const sstxt = $('#filterName').val();
    $('tr').hide().filter(':contains(\'' + sstxt + '\')').show();
    $('#show').show();
  }

  showModal1(): void {
    this.isVisible1 = true;
    // this.getUser(1);
  }

  showDeleteModal(): void {
    this.deleteVisible = true;
  }

  deleteHandleCancel(): void {
    this.deleteVisible = false;
  }

  showResetModal(): void {
    this.resetVisible = true;
  }

  resetHandleCancel(): void {
    this.resetVisible = false;
  }

  // showModal(data: SoftwareUpgrade): void {
  //   this.user = data;
  //   this.isVisible = true;
  // }

  handleCancel(): void {
    this.isVisible1 = false;
  }

  update(): void {
    this.isVisible = false;
    this.yhglService.updateUser(this.user)
      .subscribe((res: any) => {
        this.user();
        if (res.state === 200) { this.message.success(res.msg); } else { this.message.error(res.msg); }
      });
  }

  getUsers(): void {
    this.yhglService.getUsers()
      .subscribe((res: any) => {
        this.users = res.data;
        // @ts-ignore
        this.user = res.data[0];
      });
    // @ts-ignore
    // if (this.users[0] != null) {this.users = this.users[0]; console.log(this.users[0]); }
    // this.getInfo();
  }

  getCompanies(): void {
    this.yhglService.getCompanies()
      .subscribe((res: any) => {
        this.companies = res.data;
        // @ts-ignore
        this.company = this.companies[0];
      });
  }

  getRoles(): void {
    this.yhglService.getRoles()
      .subscribe((res: any) => {
        this.roles = res.data;
        // @ts-ignore
        this.role = this.roles[0];
      });
  }

  delete(id: number): void {
    this.deleteVisible = false;
    this.yhglService.deleteUser(id)
      .subscribe((res: any) => {
        this.getUsers();
        if (res.state === 200) { this.message.success(res.msg); } else { this.message.error(res.msg); }
      });
  }

  getUser(id: number): void {
    this.yhglService.getUser(id)
      .subscribe((res: any) => {
        this.user = res.data;
      });
  }

  resetPassword(id: number): void {
    this.resetVisible = false;
    this.yhglService.resetPassword(id)
      .subscribe((res: any) => {
        if (res.state === 200) {  this.message.success(res.msg + ',密码重置为123456'); } else { this.message.error(res.msg); }
        console.log(id);
      });
  }

  getRole(id: number): void {
    this.yhglService.getUser(id)
      .subscribe((res: any) => {
        this.role = res.data;
        // console.log(res.data);
      });
  }

  add(name: any, username: any,
      password: any, contact: any, company: any, role: any): void {
    this.isVisible1 = false;
    // tslint:disable-next-line:max-line-length
    this.user = {name: name.value, username: username.value, password: password.value, contact: contact.value,
      company: this.company, role: this.role,
    }; // 或者直接把密码设置为12345
    this.yhglService.addUser(this.user).subscribe((res: any) => {
      this.getUsers();
      if (res.state === 200) { this.message.success(res.msg); } else { this.message.error(res.msg); }
    });
  }

}
