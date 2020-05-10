import { Component, OnInit, ViewChild } from '@angular/core';
import {BenchData} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {MtcsService} from '../service/mtcs.service';
import {SccsComponent} from "../sccs/sccs.component";
import { NzMessageService } from 'ng-zorro-antd';

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
  private benchDatas: BenchData[];
  benchData: BenchData;
  benchid;
  operation;
  @ViewChild(SccsComponent, {static: false}) sccsComponent: SccsComponent;
  constructor(
    private benchDataService: MtcsService,
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.route.queryParams.subscribe(params => {
      if(params!=null){
        let operation=JSON.parse(localStorage.getItem("Authority")).filter(t=>{
          if(t.menu.toString() === params['menuid']){
            return t.operations;
          }
        });
        this.operation = operation[0].operations;
      }
    });
    if (this.operation.indexOf(4)==-1){
      this.message.info('您没有打开此页面的权限')
    }
  }

  showModal1(): void {
    this.isVisible1 = true;
  }

  // add(): void {
  //   this.isVisible1 = false;
  //   const add = {number: this.number, description: this.des, workshop: this.workshop};
  //   this.benchDataService.addBenchData(add)
  //     .subscribe((res: any) => {
  //       this.getBenchDatas();
  //       alert(res.msg);
  //     });
  // }

  handleCancel1(): void {
    this.getBenchDatas();
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
        this.getBenchDatas();
        alert(res.msg);
      });
  }

  handleCancel(): void {
    this.getBenchDatas();
    this.isVisible = false;
  }

  ngOnInit() {
    this.getBenchDatas();
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
        this.getBenchDatas();
        alert(res.msg);
      });
  }

  fresh(): void {
    window.location.reload();
  }
}
