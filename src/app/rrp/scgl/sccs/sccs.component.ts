import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SccsService} from '../service/sccs.service';
import {Location} from '@angular/common';
import {ProcessData} from '../../../core/entity/entity';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sccs',
  templateUrl: './sccs.component.html',
  styleUrls: ['./sccs.component.css']
})
export class SccsComponent implements OnInit {
  processData: ProcessData;

  constructor(
    private route: ActivatedRoute,
    private sccsService: SccsService,
    private location: Location,
    private message: NzMessageService
  ) { }
  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  isVisible = false;
  id = null;
  ngOnInit() {
  }
  getdata(id) {
    if (id !== null) {
      this.sccsService.getProcessDataByBench(id)
        .subscribe(res => this.processData = res.data);
    }
  }
  save(): void {
    this.sccsService.updateProcessData(this.processData)
      .subscribe((res) => {
        if (res.state === 200) {
          this.message.success('成功!');
          this.isVisible = false;
        }
      });
  }

  goBack(): void {
    this.isVisible = false;
    // this.location.back();
  }

}
