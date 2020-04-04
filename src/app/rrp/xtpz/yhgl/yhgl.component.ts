import { Component, OnInit } from '@angular/core';
import {SoftwareUpdateService} from '../../wxwh/service/software-update.service';
import {ActivatedRoute} from '@angular/router';
import {YhglService} from '../service/yhgl.service';
import {SoftwareUpgrade} from '../../../core/entity/entity';
import {User} from '../../../core/entity/yhglEntity';
import {throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-yhgl',
  templateUrl: './yhgl.component.html',
  styleUrls: ['./yhgl.component.css']
})
export class YhglComponent implements OnInit {
  isVisible = false;
  isVisible1 = false;
  des = '';
  private user: any;
  private users: [];
  private companies: [];
  private company: any;
  private role: any;
  private roles: [];

  ngOnInit() {
    this.getUsers();
    this.getCompanies();
  }

  constructor(
    private yhglService: YhglService,
    private route: ActivatedRoute
  ) { }

  showModal1(): void {
    this.isVisible1 = true;
    // this.getUser(1);
  }

  showModal(data: SoftwareUpgrade): void {
    this.user = data;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible1 = false;
  }

  add(): void {
    this.isVisible1 = false;
    // const add = {description: this.des};
    // this.softwareUpdateService.addSoftwareUpgrade(add)
    //   .subscribe((res: any) => {
    //     this.getSoftwareUpgrades();
    //     alert(res.msg);
    //   });
  }

  update(): void {
    this.isVisible = false;
    this.yhglService.updateUser(this.user)
      .subscribe((res: any) => {
        this.user();
        alert(res.msg);
      });
  }

  getUsers(): void {
    this.yhglService.getUsers()
      .subscribe((res: any) => {
        this.users = res.data;
        // @ts-ignore
        this.user = this.users[0];
      });
    // @ts-ignore
    // if (this.users[0] != null) {this.users = this.users[0]; console.log(this.users[0]); }
    // this.getInfo();
  }

  getCompanies(): void {
    this.yhglService.getCompanies()
      .subscribe((res: any) => {
        this.companies = res.data;
      });
  }

  getRoles(): void {
    this.yhglService.getRoles()
      .subscribe((res: any) => {
        this.roles = res.data;
      });
  }

  delete(id: number): void {
    this.yhglService.deleteUser(id)
      .subscribe((res: any) => {
        this.getUsers();
        alert(res.msg);
      });
  }

  getUser(id: number): void {
    // this.user = null;
    this.yhglService.getUser(id)
      .subscribe((res: any) => {
        this.user = res.data;
        console.log(this.user);
        // console.log(res.data);
      });
  }

  getRole(id: number): void {
    this.yhglService.getUser(id)
      .subscribe((res: any) => {
        this.role = res.data;
        console.log(this.role);
        // console.log(res.data);
      });
  }

}
