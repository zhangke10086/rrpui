import { Component, OnInit } from '@angular/core';
import {ConcreteCount} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {HntflService} from '../service/hntfl.service';

@Component({
  selector: 'app-hntfl',
  templateUrl: './hntfl.component.html',
  styleUrls: ['./hntfl.component.css']
})
export class HntflComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  dateFormat = 'yyyy/MM/dd';
  concreteCounts: ConcreteCount[];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private hntflService: HntflService
  ) {
  }

  ngOnInit() {
    this.getHntfl();
  }

  getHntfl(): void {
    // tslint:disable-next-line:variable-name
    let date_begin = '2020-04-13';
    // tslint:disable-next-line:variable-name
    let date_end = '2020-04-20';
    if (this.begin !== undefined) {
      // tslint:disable-next-line:variable-name
      date_begin = this.datePipe.transform(this.begin, 'yyyy-MM-dd');
      // tslint:disable-next-line:variable-name
      date_end = this.datePipe.transform(this.end, 'yyyy-MM-dd');
    }

    this.hntflService.getConcreteCounts(date_begin, date_end)
      .subscribe((res: any) => {
        this.concreteCounts = res.data;
        const countNum = [];
        const time = [];
        for (const concreteCount of this.concreteCounts) {
          countNum.push(concreteCount.count);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(concreteCount.time, 'yyyy年MM月-dd日');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.chart('container', {
          chart: {
            type: 'area'
          },
          title: {
            text: '混凝土方量'
          },
          subtitle: {
            text: '来源： 系统统计'
          },
          xAxis: {
            categories: time,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: '混凝土方量（个）'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} 个</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          time: {
            enabled: false
          },
          series: [{
            name: '混凝土方量',
            data: countNum
          }]
        });
      });
  }
}
