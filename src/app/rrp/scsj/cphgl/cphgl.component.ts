import { Component, OnInit } from '@angular/core';
import {ProductRatio} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CphglService} from '../service/cphgl.service';

@Component({
  selector: 'app-cphgl',
  templateUrl: './cphgl.component.html',
  styleUrls: ['./cphgl.component.css']
})
export class CphglComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  dateFormat = 'yyyy/MM/dd';
  productRatios: ProductRatio[];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private cphglService: CphglService
  ) {
  }

  ngOnInit() {
    this.getCphgl();
  }

  getCphgl(): void {
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

    this.cphglService.getProductRatios(date_begin, date_end)
      .subscribe((res: any) => {
        this.productRatios = res.data;
        const ratioNum = [];
        const time = [];
        for (const productRatio of this.productRatios) {
          ratioNum.push(productRatio.ratio);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(productRatio.time, 'yyyy年MM月-dd日');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.chart('container', {
          chart: {
            type: 'line'
          },
          title: {
            text: '产品合格率'
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
              text: '产品合格率（%）'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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
            name: '产品合格率',
            data: ratioNum
          }]
        });
      });
  }
}
