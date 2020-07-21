import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BenchRatio} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MtlylService} from '../service/mtlyl.service';
import {QuerylistService} from '../../../helpcenter/querylist/querylist.service';

@Component({
  selector: 'app-mtlyl',
  templateUrl: './mtlyl.component.html',
  styleUrls: ['./mtlyl.component.css']
})
export class MtlylComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  dateFormat = 'yyyy/MM/dd';
  benchRatios: BenchRatio[];
  isCollapse = false;
  selectedCompany;
  CompanyData;
  selectedRobot;
  RobotData;
  jsondata = {
    robotid: '',
    startdate: '1000-04-23',
    enddate: '3000-04-23',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id
  };

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private querylistService: QuerylistService,
    private mtlylService: MtlylService
  ) {
  }

  ngOnInit() {
    this.getCompany();
    this.onquery(this.jsondata);
  }

  @Output() onQuery: EventEmitter<any> = new EventEmitter<any>();

  getCompany() {
    this.querylistService.getCompany().then((res: any) => {
      this.CompanyData = res.data;
    });
  }

  getRobot(id) {
    this.querylistService.getRobot(id).then((res: any) => {
      this.RobotData = res.data;
    });
  }

  // 展开/关闭
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;

  }

  CompanyChange(data) {
    this.selectedCompany = data;
    this.getRobot(data.id);
  }

  RobotChange(data) {
    this.selectedRobot = data;
  }

  reset() {
    this.selectedCompany = undefined;
    this.selectedRobot = undefined;
  }

  onquery(data) {
    // data为查询组件所选值
    console.log(data);
    // 初始化 传参jsondata
    this.jsondata = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };
    // 传参赋值
    // 若不选条件 则向后端传空值
    if (data.province && data.province.name) {
      this.jsondata.province = data.province.name;
    }
    if (data.city && data.city.name) {
      this.jsondata.city = data.city.name;
    }
    if (data.company) {
      this.jsondata.companyid = data.company.id;
    }
    if (data.enddate) {
      this.jsondata.enddate = data.enddate;
    }
    if (data.startdate) {
      this.jsondata.startdate = data.startdate;
    }

    console.log(this.jsondata);

    this.mtlylService.query(this.jsondata)
      .then((res: any) => {
        this.benchRatios = res.data;
        const ratioNum = [];
        const time = [];
        for (const benchRatio of this.benchRatios) {
          ratioNum.push(benchRatio.ratio);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchRatio.time, 'yyyy年MM月dd日');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.chart('container', {
          chart: {
            type: 'line',
            backgroundColor: '#1e2340',
            plotShadow: true,
            style: {
              shadow: true,
              color: '#b1b1bb1'
            },
          },
          title: {
            text: this.selectedRobot !== null ? '平均模台利用率' : '',
            style: {
              color: '#b1b1b1'
            },
          },
          xAxis: {
            categories: time,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: '利用率（%）',
              style: {
                color: '#b1b1b1'
              },
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
            name: '模台利用率',
            data: ratioNum
          }]
        });
      });
  }
}
