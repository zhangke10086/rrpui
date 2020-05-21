import { Component, OnInit } from '@angular/core';
import {QyglService} from '../service/qygl.service';
import {Company, CompanyType, Robot} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-qygl',
  templateUrl: './qygl.component.html',
  styleUrls: ['./qygl.component.css']
})
export class QyglComponent implements OnInit {
  isVisible = false;
  isVisible1 = false;
  isVisible2 = false;
  id;
  name = '';
  // type;
  companyType: CompanyType;
  province = '';
  city = '';
  address = '';
  legalPerson = '';
  phone = '';
   companyTypes: CompanyType[];
   robots: Robot[];
   companys: Company[];
  company: Company;
  operation;
  jsondata = {
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  ngOnInit() {
    this.getCompanys();
    this.getCompanyTypes();
  }
  constructor(
    private qyglService: QyglService,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params != null) {
        const operation = JSON.parse(localStorage.getItem('Authority')).filter(t => {
          if (t.menu.toString() === params.menuid) {
            return t.operations;
          }
        });
        this.operation = operation[0].operations;
      }
    });
    if (this.operation.indexOf(4) === -1) {
      this.message.info('您没有打开此页面的权限');
    }
  }
  getCompanys(): void {
    this.qyglService.getCompanys()
      .subscribe((res: any) => {
        this.companys = res.data;
      });
  }
  getCompany(id: number): void {
    this.qyglService.getCompany(id)
      .subscribe((res: any) => {
        this.company = res.data;
      });
  }
  getCompanyTypes(): void {
    this.qyglService.getCompanyTypes()
      .subscribe((res: any) => {
        this.companyTypes = res.data;
      });
  }
  getRobotsByBelongingComapnyId(id: number): void {
    this.qyglService.getRobotByBelongingCompanyId(id)
      .subscribe((res: any) => {
        this.robots = res.data;
      });
  }
  showModa2(data: Company): void {
    this.company = data;
    this.isVisible2 = true;
  }
  showModal1(): void {
    this.isVisible1 = true;
  }
  showModal(data: Company): void {
    this.company = data;
    this.isVisible = true;
  }
  add(): void {
    this.isVisible1 = false;
    const add = {name: this.name, companyType: this.companyType, province: this.province, city: this.city,
      address: this.address, legalPerson: this.legalPerson, phone: this.phone}
    this.qyglService.addCompany(add)
      .subscribe((res: any) => {
        this.getCompanys();
        alert(res.msg);
      });
  }
  update(): void {
    this.isVisible = false;
    const update = {id: this.company.id, name: this.company.name, companyType: this.companyType,
      province: this.company.province, city: this.company.city,
      address: this.company.address, legalPerson: this.company.legalPerson, phone: this.company.phone}
    this.qyglService.updateCompany(update)
      .subscribe((res: any) => {
        this.getCompanys();
        alert(res.msg);
      });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  handleCancel1(): void {
    this.isVisible1 = false;
  }
  handleCancel2(): void {
    this.isVisible2 = false;
  }




  //
  // handleCancel(): void {
  //   this.isVisible = false;
  // }
  //
  //
  //
  //
  //
  delete(data: Company | number): void {
    this.qyglService.deleteCompany(data)
      .subscribe((res: any) => {
        this.getCompanys();
        alert(res.msg);
      });
  }

  fresh(): void {
    window.location.reload();
  }
  onquery(data) {
    // 保留上次查询
    if (this.jsondata === data) {
      this.qyglService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.companys = res.data;
        }
      });
    } else {
      // data为查询组件所选值
      console.log(data);
      // 初始化 传参jsondata
      this.jsondata = {
        province: '',
        city: '',
        companyid: '',
        owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
        companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
      };
      // 传参赋值
      // 若不选条件 则向后端传空值
      if (data.province) {
        this.jsondata.province = data.province;
      }
      if (data.city) {
        this.jsondata.city = data.city;
      }
      if (data.company) {
        this.jsondata.companyid = data.company.id;
      }
      this.qyglService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.companys = res.data;
        }
      });
    }
  }
}
