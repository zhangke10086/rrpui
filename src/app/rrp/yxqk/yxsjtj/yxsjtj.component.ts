import {Component, OnInit} from '@angular/core';
import {Run, Trouble, Warning} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {YxsjtjService} from '../Service/yxsjtj.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-yxsjtj',
  templateUrl: './yxsjtj.component.html',
  styleUrls: ['./yxsjtj.component.css']
})
export class YxsjtjComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  runsData: Run[];
  dateFormat = 'yyyy/MM/dd';
  value: string;
  runs: Run[];
  operation;
  text = '运行时长';
  troubles: Trouble[];
  private message: NzMessageService;
  jsondata = {
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    robotid: ''
  };

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private yxsjtjService: YxsjtjService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params != null) {
        const operation = JSON.parse(localStorage.getItem('Authority')).filter(t => {
          if (t.menu.toString() === params.menuid) {
            return t.operations;
          }
        });
        this.operation = operation[0].operations;
      }
    });
    if (this.operation.indexOf(4) === -1) {
      this.message.info('您没有打开此页面的权限');
    }
  }

  ngOnInit() {
    // this.getRatioLate();
    this.getYxsjtj();
    this.onquery(this.jsondata);
  }

  getYxsjtj(): void {
    const owncompanyid = JSON.parse(localStorage.getItem('userinfo')).company.id;
    // this.yxsjtjService.getRatioLate(owncompanyid)
    //   .subscribe((res: any) => {
    //     this.runsData = res.data;
    //     console.log(res.data);
    //   });
    // this.getRatioLate();
    // console.log(this.runsData);
    // tslint:disable-next-line:variable-name
    // let date_begin = this.runsData[0].time;
    // // tslint:disable-next-line:variable-name
    // let date_end = this.runsData[this.runsData.length - 1].time;
    if (this.begin !== undefined || this.end !== undefined) {
      // tslint:disable-next-line:variable-name
      const date_begin = this.datePipe.transform(this.begin, 'yyyy-MM-dd');
      // tslint:disable-next-line:variable-name
      const date_end = this.datePipe.transform(this.end, 'yyyy-MM-dd');

      this.yxsjtjService.getRunsByCompany(owncompanyid, date_begin, date_end)
        .subscribe((res: any) => {
          this.runs = res.data;
          const ratioNum = [];
          const time = [];
          for (const run of this.runs) {
            if (this.value === 'warn') {
              ratioNum.push(run.warn);
            } else if (this.value === 'wait') {
              ratioNum.push(run.wait);
            } else {
              ratioNum.push(run.run);
            }
            // tslint:disable-next-line:variable-name
            const time_str = this.datePipe.transform(run.time, 'yyyy年MM月dd日');
            time.push(time_str);
          }
          // @ts-ignore
          const highCharts = require('highCharts');
          // @ts-ignore
          require('highcharts/modules/exporting')(highCharts);
          // 创建图表
          highCharts.setOptions({
            colors: ['#5d93ff', '#5381df', '#486dbe', '#425fa6', '#38508c', '#334a80', '#2e4274'],
          });
          highCharts.chart('container', {
            chart: {
              type: 'column',
              backgroundColor: '#1e2340',
              plotShadow: true,
            },
            title: {
              text: ''
            },
            xAxis: {
              categories: time,
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: this.text,
                style: {
                  color: '#b1b1b1'
                },
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} h</b></td></tr>',
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
              name: '历史运行数据',
              data: ratioNum
            }]
          });
        });
    } else {
      this.yxsjtjService.getRatioLate(owncompanyid)
        .subscribe((res: any) => {
          this.runs = res.data;
          const ratioNum = [];
          const time = [];
          for (const run of this.runs) {
            if (this.value === 'warn') {
              ratioNum.push(run.warn);
            } else if (this.value === 'wait') {
              ratioNum.push(run.wait);
            } else {
              ratioNum.push(run.run);
            }
            // tslint:disable-next-line:variable-name
            const time_str = this.datePipe.transform(run.time, 'yyyy年MM月dd日');
            time.push(time_str);
          }
          // @ts-ignore
          const highCharts = require('highCharts');
          // @ts-ignore
          require('highcharts/modules/exporting')(highCharts);
          // 创建图表
          highCharts.setOptions({
            colors: ['#5d93ff', '#5381df', '#486dbe', '#425fa6', '#38508c', '#334a80', '#2e4274'],
          });
          highCharts.chart('container', {
            chart: {
              type: 'column',
              backgroundColor: '#1e2340',
              plotShadow: true,
            },
            title: {
              text: ''
            },
            xAxis: {
              categories: time,
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: this.text,
                style: {
                  color: '#b1b1b1'
                },
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} h</b></td></tr>',
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
              name: '历史运行数据',
              data: ratioNum
            }]
          });
        });
    }
  }

  getValueOpen(): void {
    this.value = 'open';
    this.text = '开机时长';
  }

  getValueRun(): void {
    this.value = 'run';
    this.text = '运行时长';
    this.getYxsjtj();
  }

  getValueWait(): void {
    this.value = 'wait';
    this.text = '待机时长';
    this.getYxsjtj();
  }

  getValueWarn(): void {
    this.value = 'warn';
    this.text = '故障时长';
    this.getYxsjtj();
  }

  // getRatioLate(): void {
  //   const owncompanyid = JSON.parse(localStorage.getItem('userinfo')).company.id;
  //   this.yxsjtjService.getRatioLate(owncompanyid)
  //     .subscribe((res: any) => {
  //       this.runsData = res.data;
  //     });
  // }

  onquery(data) {
    // 保留上次查询
    if (this.jsondata === data) {
      this.yxsjtjService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.runs = res.data;
        }
      });
    } else {
      // data为查询组件所选值
      console.log(data);
      // 初始化 传参jsondata
      this.jsondata = {
        province: '',
        city: '',
        companyid: '',
        owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
        companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
        robotid: ''
      };
      // 传参赋值
      // 若不选条件 则向后端传空值
      if (data.province && data.province.name) {
        this.jsondata.province = data.province.name;
      }
      if (data.city && data.city.name) {
        this.jsondata.city = data.city.name;
      }
      if (data.robot) {
        this.jsondata.robotid = data.robot.id;
      }
      if (data.company) {
        this.jsondata.companyid = data.company.id;
      }
      this.yxsjtjService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.runs = res.data;
        }
      });
    }
  }
}
