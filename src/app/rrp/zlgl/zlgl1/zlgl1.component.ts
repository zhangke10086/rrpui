import { Component, OnInit } from '@angular/core';
import {JfglService} from '../service/jfgl.service';
import {QyglService} from '../../xtpz/service/qygl.service';
import {ActivatedRoute} from '@angular/router';
import {Company, Lease, Robot} from '../../../core/entity/entity';
import {Zlgl1Service} from '../service/zlgl1.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

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
  startVisible = false;
  endVisible = false;
  startdate;
  enddate;
  radioValue = '已缴费';
  inputValue;
  operation;
  ngOnInit() {
    this.getLeases();
    this.getCompanysWithRobot();
    this.getCompanys();
  }
  constructor(
    private zlgl1Service: Zlgl1Service,
    private jfglService: JfglService,
    private qyglService: QyglService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {
    this.route.queryParams.subscribe(params => {
      if(params!=null){
        let operation=JSON.parse(localStorage.getItem("Authority")).filter(t=>{
          if(t.menu.toString() === params['menuid']){
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
  remind(data){
    console.log(data);
    this.modalService.confirm({
      nzTitle: null,
      nzContent: '<b style="color: red;">您确定要对该布料机器人发送缴费提醒吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.remindOk(data),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  cancleremind(data){
    this.modalService.confirm({
      nzTitle: null,
      nzContent: '<b style="color: red;">您确定要对该布料机器人取消提醒吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.remindCancle(data),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  remindOk(data){
    console.log(data);
    const robotid = data.robot.id;
    const companyid = data.companyId.id;
    this.zlgl1Service.remind(robotid, companyid).then(res => {
      this.getLeases();

    });
  }
  remindCancle(data) {
    console.log(data);
    const robotid = data.robot.id;
    this.zlgl1Service.cancleremind(robotid).then(res => {
      this.getLeases();
    });
  }
  start() {

  }
  end() {

  }
  onChangeStart(data) {

  }
  onChangeEnd(data) {

  }
  showModalVisible(data, state) {
    console.log(data);
    // 启用
    if (state === 1) {
      this.modalService.confirm({
        nzTitle: null,
        nzContent: '<b style="color: red;">您确定要启用该布料机器人吗？</b>',
        nzOkText: '确定',
        nzOnOk: () =>  this.zlgl1Service.start(data).then((res:any)=>{
          if (res.state ===200){
            this.getLeases();
            this.message.success('启用成功！')
          }
        }),
        nzCancelText: '取消',
        nzOnCancel: () => console.log('Cancel')
      });

    }
    if (state === 2) {
      this.modalService.confirm({
        nzTitle: null,
        nzContent: '<b style="color: red;">您确定要停用该布料机器人吗？</b>',
        nzOkText: '确定',
        nzOnOk: () =>    this.zlgl1Service.stop(data).then((res:any)=>{
          if (res.state ===200){
            this.getLeases();
            this.message.success('停用成功！')
          }
        }),
        nzCancelText: '取消',
        nzOnCancel: () => console.log('Cancel')
      });

    }

  }
}
