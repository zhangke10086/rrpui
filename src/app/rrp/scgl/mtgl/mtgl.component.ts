import { Component, OnInit } from '@angular/core';
import {Bench, Robot} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {MtglService} from '../service/mtgl.service';
import { NzMessageService } from 'ng-zorro-antd';
import {BljqrglService} from '../../xtpz/service/bljqrgl.service';



@Component({
  selector: 'app-mtgl',
  templateUrl: './mtgl.component.html',
  styleUrls: ['./mtgl.component.css']
})
export class MtglComponent implements OnInit {
  isVisible = false;
  isVisible1 = false;
  number = '';
  des = '';
  workshop = '';
  private robots: Robot[];
  private benchs: Bench[];
  bench: Bench;
  jsondata;
  constructor(
    private benchService: MtglService,
    private bljqrglService: BljqrglService,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
  }

  showModal1(): void {
    this.isVisible1 = true;
  }

  add(): void {
    this.isVisible1 = false;
    const add = {number: this.number, description: this.des, workshop: this.workshop};
    this.benchService.addBench(add)
      .subscribe((res: any) => {
        this.getBenchs();
        alert(res.msg);
      });
  }

  handleCancel1(): void {
    this.onquery(this.jsondata);
    this.isVisible1 = false;
  }

  showModal(data: Bench): void {
    this.bench = data;
    this.isVisible = true;
  }

  update(): void {
    this.isVisible = false;
    this.benchService.updateBench(this.bench)
      .subscribe((res: any) => {
        this.onquery(this.jsondata);
        this.message.success('修改成功！');
      });
  }

  handleCancel(): void {
    this.onquery(this.jsondata);
    this.isVisible = false;
  }

  ngOnInit() {
    this.onquery(this.jsondata);
    this.getRobots();
  }
  // @ts-ignore
  compareFn(o1: Compare, o2: Compare): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  getRobots(): void {
    this.bljqrglService.getRobots()
      .subscribe((res: any) => {
        this.robots = res.data;
      });
  }
  getBenchs(): void {
    this.benchService.getBenchs()
      .subscribe((res: any) => {
        this.benchs = res.data;
      });
  }

  delete(data: Bench | number): void {
    this.benchService.deleteBench(data)
      .subscribe((res: any) => {
        this.onquery(this.jsondata);
        this.message.success('删除成功！');
      });
  }

  fresh(): void {
    window.location.reload();
  }
  onquery(data){
    this.query(data);
  }
  query(data){
    console.log(data);
    if(data !=null){
      this.jsondata = data;
      if(data.robot != null) {
        const robotid = data.robot.id;
        this.benchService.getDataByRobotId(robotid).then((res:any)=>{
          this.benchs = res.data;
        })
      } else {
        this.getBenchs();
      }
    } else {
      this.getBenchs();
    }

  }
}
