import { Component, OnInit } from '@angular/core';
import {Company, Robot} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {BljqrglService} from '../service/bljqrgl.service';
import {QyglService} from '../service/qygl.service';

@Component({
  selector: 'app-bljqrgl',
  templateUrl: './bljqrgl.component.html',
  styleUrls: ['./bljqrgl.component.css']
})
export class BljqrglComponent implements OnInit {
  // 更新用
  isVisible = false;
  isVisible1 = false;
  private id = '';
  private name = '';
  private way = '';
  private useSituation = '未启用';
  private ways: string[] = ['租赁', '购买', '制造'];
  private company: Company;
  private robots: Robot[];
  private companys: Company[];
  robot: Robot;

  constructor(
    private bljqrglService: BljqrglService,
    private qyglService: QyglService,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.getRobots();
    this.getCompanys();
  }
// 更新用
  showModal(data: Robot): void {
    this.robot = data;
    this.isVisible = true;
  }
  showModal1(): void {
    this.isVisible1 = true;
  }
  handleCancel1(): void {
    this.isVisible1 = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  add(): void {
    this.isVisible1 = false;
    const add = {id: this.id, name: this.name, way: this.way, belongingCompany: this.company, use_situation: this.useSituation}
    this.bljqrglService.addRobot(add)
      .subscribe((res: any) => {
        this.getRobots();
        alert(res.msg);
      });
  }
  delete(data: Robot | number): void {
    this.bljqrglService.deleteRobot(data)
      .subscribe((res: any) => {
        this.getRobots();
        alert(res.msg);
      });
  }
  update(): void {
    this.isVisible = false;
    this.bljqrglService.updateRobot(this.robot)
      .subscribe((res: any) => {
        this.getRobots();
        alert(res.msg);
      });
  }
  getRobots(): void {
    this.bljqrglService.getRobots()
      .subscribe((res: any) => {
        this.robots = res.data;
      });
  }
  getRobot(id: number): void {
    this.bljqrglService.getRobot(id)
      .subscribe((res: any) => {
        this.robot = res.data;
      });
  }
  getCompanys(): void {
    this.qyglService.getCompanys()
      .subscribe((res: any) => {
        this.companys = res.data;
      });
  }
  fresh(): void {
    window.location.reload();
  }

}
