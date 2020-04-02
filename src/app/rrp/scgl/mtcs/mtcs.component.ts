import { Component, OnInit } from '@angular/core';
import {BenchData} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {MtcsService} from '../service/mtcs.service';

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

  constructor(
    private benchDataService: MtcsService,
    private route: ActivatedRoute
  ) {
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
    this.isVisible = true;
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
