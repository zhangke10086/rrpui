import { Component, OnInit } from '@angular/core';
import {RobotData} from '../../../core/entity/entity';
import {CssdService} from '../service/cssd.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cssd',
  templateUrl: './cssd.component.html',
  styleUrls: ['./cssd.component.css']
})
export class CssdComponent implements OnInit {
  isVisible = false;
  private robotDatas: RobotData[];
  robotData: RobotData;

  constructor(
    private cssdService: CssdService,
    private route: ActivatedRoute
  ) {
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
