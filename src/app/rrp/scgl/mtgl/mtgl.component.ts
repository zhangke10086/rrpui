import { Component, OnInit } from '@angular/core';
import {Bench} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {MtglService} from '../service/mtgl.service';

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
  private benchs: Bench[];
  bench: Bench;

  constructor(
    private benchService: MtglService,
    private route: ActivatedRoute
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
    this.getBenchs();
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
        this.getBenchs();
        alert(res.msg);
      });
  }

  handleCancel(): void {
    this.getBenchs();
    this.isVisible = false;
  }

  ngOnInit() {
    this.getBenchs();
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
        this.getBenchs();
        alert(res.msg);
      });
  }

  fresh(): void {
    window.location.reload();
  }
}
