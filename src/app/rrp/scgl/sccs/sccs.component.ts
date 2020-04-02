import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SccsService} from '../service/sccs.service';
import {Location} from '@angular/common';
import {ProcessData} from '../../../core/entity/entity';

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
    private location: Location
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.sccsService.getProcessDataByBench(id)
      .subscribe(res => this.processData = res.data);
  }

  save(): void {
    this.sccsService.updateProcessData(this.processData)
      .subscribe((res) => {
        alert(res.msg);
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
