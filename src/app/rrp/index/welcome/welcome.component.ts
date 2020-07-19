import { Component, OnInit, ViewChild } from '@angular/core';
import {MtcsService} from '../../scgl/service/mtcs.service';
import {BenchData} from '../../../core/entity/entity';
import { NzMessageService } from 'ng-zorro-antd';
import {QuerylistComponent} from '../../../helpcenter/querylist/querylist.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('querylist', {static: false }) querylist: QuerylistComponent;
  benchDatas: BenchData[];
  benchData: BenchData;
  jsondata = {
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    robotid: ''
  };
  constructor( private benchDataService: MtcsService) {
  }
  ngOnInit() {
    const query = JSON.parse(localStorage.getItem('query'));
    this.onquery(query);
  }
  onquery(data) {
    // 保留上次查询
    if (this.jsondata === data) {
      this.benchDataService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.benchDatas = res.data;
        }
      });
    } else {
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
      if (data.province) {
        this.jsondata.province = data.province;
      }
      if (data.city) {
        this.jsondata.city = data.city;
      }
      if (data.robot) {
        this.jsondata.robotid = data.robot.id;
      }
      if (data.company) {
        this.jsondata.companyid = data.company.id;
      }
      this.benchDataService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.benchDatas = res.data;
          localStorage.setItem('query', JSON.stringify({
            province: data.province ? data.province : undefined,
            city: data.city ? data.city : undefined,
            company: data.company ? data.company : undefined,
            robot: data.robot ? data.robot : undefined
          }));
        }
      });
    }
  }
}
