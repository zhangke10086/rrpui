import { Component, OnInit } from '@angular/core';
import {Company, CompanyType, Lease, Pay, Robot} from '../../../core/entity/entity';
import {QyglService} from '../../xtpz/service/qygl.service';
import {ActivatedRoute} from '@angular/router';
import {JfglService} from '../service/jfgl.service';
import {Zlgl1Service} from '../service/zlgl1.service';
import { NzMessageService } from 'ng-zorro-antd';

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
   id;
   paymentAmount: number;
   paymentTime: string;
   paymentDeadline: string;
   examineSituation = '未审核';
   paymentDuration: string;
   paymentVoucher: string;
   contractId: string;
   company: Company;
   company1: Company;
   robot: Robot;
   lease: Lease;
   leases: Lease[];
   robots: Robot[];
  // 所有公司
   companys: Company[];
  // 拥有机器人的公司
   companys1: Company[];
   pays: Pay[];
  pay: Pay;
  operation;
  jsondata = {
    province:'',
    city:"",
    robotid:'',
    companyid:'',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  }
  ngOnInit() {
    this.onquery(this.jsondata);
    this.getCompanys();
    this.getLeases();
    this.getCompanysWithRobot();
  }
  constructor(
    private jfglService: JfglService,
    private qyglService: QyglService,
    private zlgl1Service: Zlgl1Service,
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
      paymentDuration: this.paymentDuration, paymentVoucher: this.paymentVoucher, lease: this.lease };
    this.jfglService.addPay(add)
      .subscribe((res: any) => {
        if(res.state===200){
          this.onquery(this.jsondata);
          this.message.success('增加成功！')
        }
      });
  }
  delete(data: Pay | number): void {
    this.jfglService.deletePay(data)
      .subscribe((res: any) => {
        if(res.state===200) {
          this.onquery(this.jsondata);
          this.message.success('删除成功！')
        }
      });
  }
  update(): void {
    this.isVisible = false;
    this.jfglService.updatePay(this.pay)
      .subscribe((res: any) => {
        if(res.state===200) {
          this.onquery(this.jsondata);
          this.message.success('修改成功！')
        }
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
  onquery(data) {
    this.query(data);
  }
  query(data) {
    if(data == this.jsondata){
      this.jfglService.query(this.jsondata).then((res:any)=>{
        if(res.state===200){
          this.pays = res.data;
        }
      })
    } else {
      this.jsondata ={
        province:'',
        city:"",
        robotid:'',
        companyid: '',
        owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
        companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
      }
      if(data !=undefined){
        if (data.province){
          this.jsondata.province=data.province;
        }
        if (data.city){
          this.jsondata.city=data.city;
        }
        if (data.robot){
          this.jsondata.robotid=data.robot.id;
        }
        if (data.company) {
          this.jsondata.companyid = data.company.id;
        }
        this.jfglService.query(this.jsondata).then((res:any)=>{
          if(res.state===200){
            this.pays = res.data;
          }
        })
      }
    }
  }
}
