import {Component, OnInit} from '@angular/core';
import {MtgsService} from '../service/mtgs.service';
import {BenchCount} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-mtgs',
  templateUrl: './mtgs.component.html',
  styleUrls: ['./mtgs.component.css']
})
export class MtgsComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  dateFormat = 'yyyy/MM/dd';
  benchCounts: BenchCount[];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private mtgsService: MtgsService
  ) {
  }

  ngOnInit() {
    this.getMtgs();
  }

  getMtgs(): void {
    // tslint:disable-next-line:variable-name
    let date_begin = '2020-04-23';
    // tslint:disable-next-line:variable-name
    let date_end = '2020-04-30';
    if (this.begin !== undefined) {
      // tslint:disable-next-line:variable-name
      date_begin = this.datePipe.transform(this.begin, 'yyyy-MM-dd');
      // tslint:disable-next-line:variable-name
      date_end = this.datePipe.transform(this.end, 'yyyy-MM-dd');
    }

    this.mtgsService.getBenchCounts(date_begin, date_end)
      .subscribe((res: any) => {
        this.benchCounts = res.data;
        const countNum = [];
        const time = [];
        for (const benchCount of this.benchCounts) {
          countNum.push(benchCount.count);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchCount.time, 'yyyy年MM月-dd日');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: '模台个数'
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
              text: '模台个数（个）'
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
            name: '模台个数',
            data: countNum
          }]
        });
      });
  }
}
