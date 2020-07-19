import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MtgsService} from '../service/mtgs.service';
import {BenchCount} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {QuerylistService} from '../../../helpcenter/querylist/querylist.service';

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
  benchCount: BenchCount;
  isCollapse = false;
  selectedCompany;
  CompanyData;
  selectedRobot;
  RobotData;
  jsondata={
    robotid:'',
    startdate:'',
    enddate:''
  };
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private querylistService: QuerylistService,
    private mtgsService: MtgsService
  ) {
  }

  ngOnInit() {
    this.getMtgs();
  }
  getMtgsByRobot(robotId: number): void {
    this.mtgsService.getCountByRobotId(robotId)
      .subscribe((res: any) => {
        this.benchCount = res.data;
      });
  }
  getMtgs(): void {
    // tslint:disable-next-line:variable-name
    let date_begin = '1000-04-23';
    // tslint:disable-next-line:variable-name
    let date_end = '3000-04-30';
    if (this.begin !== undefined) {
      // tslint:disable-next-line:variable-name
      date_begin = this.datePipe.transform(this.begin, 'yyyy-MM-dd');
      // tslint:disable-next-line:variable-name
      date_end = this.datePipe.transform(this.end, 'yyyy-MM-dd');
    }
    this.mtgsService.getBenchCounts(date_begin, date_end, this.selectedRobot !== undefined ? this.selectedRobot.id : null)
      .subscribe((res: any) => {
        this.benchCounts = res.data;
        const countNum = [];
        const time = [];
        for (const benchCount of this.benchCounts) {
          countNum.push(benchCount.count);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchCount.time, 'yyyy年MM月dd日');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.setOptions({
          colors: ['#5d93ff', '#5381df', '#486dbe', '#425fa6' , '#38508c', '#334a80', '#2e4274'],
        });
        highCharts.chart('container', {
          chart: {
            type: 'column',
            backgroundColor: '#1e2340',
            plotShadow: true,
          },
          title: {
            text: this.selectedRobot !== undefined ? '' : '模台总数',
            style: {
                shadow: true,
                color: '#b1b1b1'
            },
          },
          xAxis: {
            categories: time,
            crosshair: true,
            gridLineWidth: '0px',
            plotLines: [{
              width: 1,
              color: '#f00'
            }],
          },
          yAxis: {
            min: 0,
            title: {
              text: this.selectedRobot !== undefined ? '模台个数(个)' : '模台总数(个)',
              style: {
                color: '#b1b1b1'
              },
            },
            labels: {
              style: {
                 color: '#b1b1b1'
              },
            },
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
              borderWidth: 0,
              shadow: true,
              colorByPoint: true
            }
          },
          time: {
            enabled: false
          },

          series: [{
            name: '模台个数',
            labels: {
              style: {
                shadow: true,
                color: '#b1b1b1'
              },
            },
            data: countNum
          }]
        });
      });

  }
  onquery(data){
    console.log(data);

    //参数赋值
    if(data.startdate){
      this.begin = data.startdate;
    }
    if(data.enddate){
      this.end = data.enddate;
    }
    if(data.robot){
      this.selectedRobot = data.robot;
    }
    this.getMtgs();
  }
}
