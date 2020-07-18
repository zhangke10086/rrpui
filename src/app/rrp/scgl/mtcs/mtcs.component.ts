import {Component, OnInit, ViewChild} from '@angular/core';
import {BenchData} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {MtcsService} from '../service/mtcs.service';
import {SccsComponent} from '../sccs/sccs.component';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-mtcs',
  templateUrl: './mtcs.component.html',
  styleUrls: ['./mtcs.component.css']
})
export class MtcsComponent implements OnInit {
  isVisible = false;
  isVisible1 = false;
  number = '';
  des = '';
  workshop = '';
  benchDatas: BenchData[];
  benchData: BenchData;
  benchid;
  accountArray;
  operation;
  // 前端传参
  jsondata = {
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    robotid: ''
  };
  @ViewChild(SccsComponent, {static: false}) sccsComponent: SccsComponent;

  constructor(
    private benchDataService: MtcsService,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params != null) {
        let operation = JSON.parse(localStorage.getItem("Authority")).filter(t => {
          if (t.menu.toString() === params['menuid']) {
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

  showModal1(): void {
    this.isVisible1 = true;
  }

  selectCheckbox(check: boolean, value: string) {
    if (check) {
      this.accountArray.push(value);
    }
  }

  add(): void {
    this.isVisible1 = false;
    const add = {number: this.number, description: this.des, workshop: this.workshop};
    this.benchDataService.addBenchData(add)
      .subscribe((res: any) => {
        this.getBenchDatas();
        alert(res.msg);
      });
  }

  handleCancel1(): void {
    this.onquery(this.jsondata);
    this.isVisible1 = false;
  }

  showModal(data: BenchData): void {
    this.benchData = data;
    this.sccsComponent.getdata(data.id);
    this.sccsComponent.isVisible = true;
  }

  update(): void {
    this.isVisible = false;
    this.benchDataService.updateBenchData(this.benchData)
      .subscribe((res: any) => {
        this.onquery(this.jsondata);
        alert(res.msg);
      });
  }

  handleCancel(): void {
    this.onquery(this.jsondata);
    this.isVisible = false;
  }

  ngOnInit() {
    this.onquery(this.jsondata);
  }

  getBenchDatas(): void {
    this.benchDataService.getBenchDatas()
      .subscribe((res: any) => {
        this.benchDatas = res.data;
      });
  }

  delete(data: BenchData | number): void {
    this.benchDataService.deleteBenchData(data)
      .subscribe((res: any) => {
        this.onquery(this.jsondata);
        alert(res.msg);
      });
  }

  fresh(): void {
    window.location.reload();
  }

  onquery(data) {
    // 保留上次查询
    if (this.jsondata === data) {
      this.benchDataService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
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
        }
      })
    }
  }

}
