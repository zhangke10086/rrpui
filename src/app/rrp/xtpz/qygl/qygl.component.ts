import { Component, OnInit } from '@angular/core';
import {QyglService} from '../service/qygl.service';
import {Company, CompanyType, Robot} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';


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
  private companyTypes: CompanyType[];
  private robots: Robot[];
  private companys: Company[];
  company: Company;
  ngOnInit() {
    this.getCompanys();
    this.getCompanyTypes();
  }
  constructor(
    private qyglService: QyglService,
    private route: ActivatedRoute
  ) {
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

}
