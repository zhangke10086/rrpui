import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WarningService} from '../service/warning.service';
import {Warning} from '../../../core/entity/entity';
import { NzMessageService } from 'ng-zorro-antd';
import {Zlgl1Service} from '../../zlgl/service/zlgl1.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})

export class WarningComponent implements OnInit {
  isVisible = false;
  // isVisible1 = false;
  warnings: Warning[];
  warning: Warning;
  // warning1: Warning;
  operation;
  jsondata;
  constructor(
    private zlgl1Service: Zlgl1Service,
    private warningService: WarningService,
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

  //
  // showModal1(): void {
  //   this.warning1 = null;
  //   this.isVisible1 = true;
  // }
  //
  // add(): void {
  //   this.isVisible1 = false;
  //   this.warningService.addWarning(this.warning1)
  //     .subscribe((res) => {
  //       this.getWarnings();
  //       alert(res.msg);
  //     });
  // }
  //
  // handleCancel1(): void {
  // this.getWarnings();
  //   this.isVisible1 = false;
  // }

  showModal(data: Warning): void {
    this.warning = data;
    this.isVisible = true;
  }

  update(): void {
    this.isVisible = false;
    this.warningService.updateWarning(this.warning)
        .subscribe((res) => {
          this.getWarnings();
          this.onquery(this.jsondata);
          alert(res.msg);
        });
  }

  handleCancel(): void {
    this.getWarnings();
    this.onquery(this.jsondata);
    this.isVisible = false;
  }

  ngOnInit() {
    this.onquery(this.jsondata);
    this.getWarnings();
  }

  getWarnings(): void {
    this.warningService.getWarnings()
      .subscribe(res => {
        this.warnings = res.data;
      });
  }

  delete(data: Warning | number): void {
    this.warningService.deleteWarning(data)
      .subscribe(res => {
        this.getWarnings();
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
        this.warningService.getDataByRobotId(robotid).then((res: any) => {
          this.warnings = res.data;
        });
      } else {
        this.getWarnings();
      }
    } else {
      this.getWarnings();
    }

  }
}
