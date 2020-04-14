import { Component, OnInit } from '@angular/core';
import {JfglService} from '../service/jfgl.service';
import {QyglService} from '../../xtpz/service/qygl.service';
import {ActivatedRoute} from '@angular/router';
import {Company, Lease, Robot} from '../../../core/entity/entity';
import {Zlgl1Service} from '../service/zlgl1.service';

@Component({
  selector: 'app-zlgl1',
  templateUrl: './zlgl1.component.html',
  styleUrls: ['./zlgl1.component.css']
})
export class Zlgl1Component implements OnInit {
// 修改弹窗
  isVisible = false;
  // 增加弹框
  isVisible1 = false;
  // 查看详情弹框
  isVisible2 = false;

  private contractId;
  private costMonth;
  private costWay;
  private contract;
  private connector;
  private paymentSituation = '已欠费';
  private workshopId = '';
  private internalId = '';
  private leases: Lease[];
  private lease: Lease;
  private id;
  private robot: Robot;
  private robots: Robot[];
  // 查找到的机器人的所属公司
  private company: Company;
  private company1: Company;
  private companys1: Company[];
  private companys: Company[];
  ngOnInit() {
    this.getLeases();
    this.getCompanysWithRobot();
    this.getCompanys();
  }
  constructor(
    private zlgl1Service: Zlgl1Service,
    private jfglService: JfglService,
    private qyglService: QyglService,
    private route: ActivatedRoute
  ) {
  }
  getLeases(): void {
    this.zlgl1Service.getLeases()
      .subscribe((res: any) => {
        this.leases = res.data;
      });
  }
  getLease(id: number): void {
    this.zlgl1Service.getLease(id)
      .subscribe((res: any) => {
        this.lease = res.data;
      });
  }
  getCompanysWithRobot(): void {
    this.qyglService.getCompanysWithRobot()
      .subscribe((res: any) => {
        this.companys = res.data;
      });
  }
  getCompanys(): void {
    this.qyglService.getCompanys()
      .subscribe((res: any) => {
        this.companys1 = res.data;
      });
  }
  getRobotsByBelongingComapnyId(id: number): void {
    this.qyglService.getRobotByBelongingCompanyId(id)
      .subscribe((res: any) => {
        this.robots = res.data;
      });
  }
  showModa2(data: Lease): void {
    this.getCompanysWithRobot();
    this.getCompanys();
    this.lease = data;
    this.contractId = data.contractId;
    this.costMonth = data.costMonth;
    this.costWay = data.costWay;
    this.contract = data.contract;
    this.connector = data.connector;
    this.id = data.id;
    this.robot = data.robot;
    this.isVisible2 = true;
  }
  showModal1(): void {
    this.isVisible1 = true;
  }
  showModal(data: Lease): void {
    this.getCompanysWithRobot();
    this.getCompanys();
    this.lease = data;
    this.contractId = data.contractId;
    this.costMonth = data.costMonth;
    this.costWay = data.costWay;
    this.contract = data.contract;
    this.company1 = data.company;
    this.connector = data.connector;
    this.id = data.id;
    this.robot = data.robot;
    this.isVisible = true;
  }
  add(): void {
    this.isVisible1 = false;
    const add = { robot: this.robot, contractId: this.contractId, companyId: this.company1,
      costWay: this.costWay, costMonth: this.costMonth, startTime: new Date().getTime() + '',
      paymentSituation: this.paymentSituation, workshopId: this.workshopId, internalId: this.internalId,
      contract: this.contract, connector: this.connector};
    this.zlgl1Service.addLease(add)
      .subscribe((res: any) => {
        this.getLeases();
        alert(res.msg);
      });
  }
  delete(data: Lease | number): void {
    this.zlgl1Service.deleteLease(data)
      .subscribe((res: any) => {
        this.getLeases();
        alert(res.msg);
      });
  }
  update(): void {
    const update = {id: this.id, robot: this.robot, contractId: this.contractId, companyId: this.company1,
      costWay: this.costWay, costMonth: this.costMonth, startTime: Date.parse(new Date().toDateString()) + '',
      paymentSituation: this.paymentSituation, workshopId: this.workshopId, internalId: this.internalId,
      contract: this.contract, connector: this.connector};
    this.zlgl1Service.updateLease(update)
      .subscribe((res: any) => {
        this.getLeases();
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
