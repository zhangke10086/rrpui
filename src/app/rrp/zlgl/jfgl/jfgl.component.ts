import { Component, OnInit } from '@angular/core';
import {Company, CompanyType, Lease, Pay, Robot} from '../../../core/entity/entity';
import {QyglService} from '../../xtpz/service/qygl.service';
import {ActivatedRoute} from '@angular/router';
import {JfglService} from '../service/jfgl.service';
import {Zlgl1Service} from '../service/zlgl1.service';

@Component({
  selector: 'app-jfgl',
  templateUrl: './jfgl.component.html',
  styleUrls: ['./jfgl.component.css']
})
export class JfglComponent implements OnInit {
  // 修改弹窗
  isVisible = false;
  // 增加弹框
  isVisible1 = false;
  // 查看详情弹框
  isVisible2 = false;
  private id;
  private paymentAmount: number;
  private paymentTime: string;
  private paymentDeadline: string;
  private examineSituation = '未审核';
  private paymentDuration: string;
  private paymentVoucher: string;
  private contractId: string;
  private company: Company;
  private company1: Company;
  private robot: Robot;
  private lease: Lease;
  private leases: Lease[];
  private robots: Robot[];
  // 所有公司
  private companys: Company[];
  // 拥有机器人的公司
  private companys1: Company[];
  private pays: Pay[];
  pay: Pay;
  ngOnInit() {
    this.getPays();
    this.getCompanys();
    this.getLeases();
    this.getCompanysWithRobot();
  }
  constructor(
    private jfglService: JfglService,
    private qyglService: QyglService,
    private zlgl1Service: Zlgl1Service,
    private route: ActivatedRoute
  ) {
  }
  getPays(): void {
    this.jfglService.getPays()
      .subscribe((res: any) => {
        this.pays = res.data;
      });
  }
  getPay(id: number): void {
    this.jfglService.getPay(id)
      .subscribe((res: any) => {
        this.pay = res.data;
      });
  }
  getRobotsByBelongingComapnyId(id: number): void {
    this.qyglService.getRobotByBelongingCompanyId(id)
      .subscribe((res: any) => {
        this.robots = res.data;
      });
  }
  getCompanysWithRobot(): void {
    this.qyglService.getCompanysWithRobot()
      .subscribe((res: any) => {
        this.companys1 = res.data;
      });
  }
  getCompanys(): void {
    this.qyglService.getCompanys()
      .subscribe((res: any) => {
        this.companys = res.data;
      });
  }
  getLeases(): void {
    this.zlgl1Service.getLeases()
      .subscribe((res: any) => {
        this.leases = res.data;
      });
  }
  showModa2(data: Pay): void {
    console.log(data);
    this.pay = data;
    this.isVisible2 = true;
    this.id = data.id;
    this.paymentAmount = data.paymentAmount;
    this.paymentTime = data.paymentTime;
    this.examineSituation = data.examineSituation;
    this.paymentDuration = data.paymentDuration;
    this.paymentDeadline = data.paymentDeadline;
    this.paymentVoucher = data.paymentVouncher;
    this.company = data.company;
    this.robot = data.robot;
    this.lease = data.lease;
  }
  showModal1(): void {
    this.getCompanysWithRobot();
    this.getCompanys();
    this.isVisible1 = true;
  }
  showModal(data: Pay): void {
    this.getCompanysWithRobot();
    this.getCompanys();
    this.pay = data;
    this.isVisible = true;
  }
  add(): void {
    this.isVisible1 = false;
    const add = {robot: this.robot, paymentAmount: this.paymentAmount, company: this.company,
      paymentTime: this.paymentTime, paymentDeadline: this.paymentDeadline, examineSituation: this.examineSituation,
      paymentDuration: this.paymentDuration, paymentVoucher: this.paymentVoucher, lease: this.lease }
    this.jfglService.addPay(add)
      .subscribe((res: any) => {
        this.getPays();
        alert(res.msg);
      });
  }
  delete(data: Pay | number): void {
    this.jfglService.deletePay(data)
      .subscribe((res: any) => {
        this.getPays();
        alert(res.msg);
      });
  }
  update(): void {
    this.isVisible = false;
    this.jfglService.updatePay(this.pay)
      .subscribe((res: any) => {
        this.getPays();
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
  fresh(): void {
    window.location.reload();
  }
}
