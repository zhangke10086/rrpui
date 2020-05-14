import { Component, OnInit } from '@angular/core';
import {RobotData} from '../../../core/entity/entity';
import {CssdService} from '../service/cssd.service';
import {ActivatedRoute} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-cssd',
  templateUrl: './cssd.component.html',
  styleUrls: ['./cssd.component.css']
})
export class CssdComponent implements OnInit {
  isVisible = false;
  robotDatas: RobotData[];
  robotData: RobotData;
  operation;
  constructor(
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
        alert(res.msg);
      });
  }

  handleCancel(): void {
    this.getRobotDatas();
    this.isVisible = false;
  }

  ngOnInit() {
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
        alert(res.msg);
      });
  }
}
