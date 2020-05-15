import { Component, OnInit } from '@angular/core';
import {Lease, RobotData} from '../../../core/entity/entity';
import {CssdService} from '../service/cssd.service';
import {ActivatedRoute} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import {Zlgl1Service} from '../../zlgl/service/zlgl1.service';

@Component({
  selector: 'app-cssd',
  templateUrl: './cssd.component.html',
  styleUrls: ['./cssd.component.css']
})
export class CssdComponent implements OnInit {
  jsondata;
  leases: Lease[];
  lease: Lease;
  isVisible = false;
  robotDatas: RobotData[];
  robotData: RobotData;
  operation;
  constructor(
    private zlgl1Service: Zlgl1Service,
    private cssdService: CssdService,
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

  showModal(data: RobotData): void {
    this.robotData = data;
    this.isVisible = true;
  }

  update(): void {
    this.isVisible = false;
    this.cssdService.updateRobotData(this.robotData)
      .subscribe((res) => {
        this.getRobotDatas();
        this.onquery(this.jsondata);
        alert(res.msg);
      });
  }

  handleCancel(): void {
    this.getRobotDatas();
    this.onquery(this.jsondata);
    this.isVisible = false;
  }

  ngOnInit() {
    this.onquery(this.jsondata);
    this.getRobotDatas();
  }

  getRobotDatas(): void {
    this.cssdService.getRobotDatas()
      .subscribe(res => {
        this.robotDatas = res.data;
      });
  }

  delete(data: RobotData | number): void {
    this.cssdService.deleteRobotData(data)
      .subscribe(res => {
        this.getRobotDatas();
        this.onquery(this.jsondata);
        alert(res.msg);
      });
  }
  onquery(data) {
    console.log(data);
    this.query(data);
  }
  query(data) {
    if (data != null) {
      this.jsondata = data;
      if (data.robot != null) {
        const robotid = data.robot.id;
        this.cssdService.getDataByRobotId(robotid).then((res: any) => {
          this.robotDatas = res.data;
        });
      } else {
        this.getRobotDatas();
      }
    } else {
      this.getRobotDatas();
    }

  }
}
