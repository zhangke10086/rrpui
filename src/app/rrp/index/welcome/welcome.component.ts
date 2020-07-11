import { Component, OnInit } from '@angular/core';
import {MtcsService} from '../../scgl/service/mtcs.service';
import {BenchData} from '../../../core/entity/entity';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  benchDatas: BenchData[];
  benchData: BenchData;
  jsondata = {
    province:'',
    city:'',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    robotid:''
  }
  constructor( private benchDataService: MtcsService) {

  }

  ngOnInit() {
    const date = new Date();

  }
  onquery(data){
    // 保留上次查询
    if(this.jsondata === data){
      this.benchDataService.query(this.jsondata).then((res:any)=>{
        if (res.state === 200){
          this.benchDatas = res.data;
        }
      })
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
        robotid: ''
      };
      // 传参赋值
      // 若不选条件 则向后端传空值
      if (data.province){
        this.jsondata.province = data.province;
      }
      if (data.city){
        this.jsondata.city = data.city;
      }
      if (data.robot){
        this.jsondata.robotid = data.robot.id;
      }
      if (data.company) {
        this.jsondata.companyid = data.company.id;
      }
      this.benchDataService.query(this.jsondata).then((res:any)=>{
        if (res.state === 200){
          this.benchDatas = res.data;
        }
      })
    }
  }
}
