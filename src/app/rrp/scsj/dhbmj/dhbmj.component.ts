import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BoardArea} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {DhbmjService} from '../service/dhbmj.service';
import {QuerylistService} from '../../../helpcenter/querylist/querylist.service';

@Component({
  selector: 'app-dhbmj',
  templateUrl: './dhbmj.component.html',
  styleUrls: ['./dhbmj.component.css']
})
export class DhbmjComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  dateFormat = 'yyyy/MM/dd';
  benchAreas: BoardArea[];
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
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private querylistService: QuerylistService,
    private dhbmjService: DhbmjService
  ) {
  }

  ngOnInit() {
    this.onquery(this.jsondata);
    this.getCompany();
  }

  @Output() onQuery: EventEmitter<any> = new EventEmitter<any>();

  query() {
    const data = {
      company: '',
      robot: ''
    };
    data.company = this.selectedCompany;
    data.robot = this.selectedRobot;
    this.onQuery.emit(data);
  }

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

    this.dhbmjService.query(this.jsondata)
      .then((res: any) => {
        this.benchAreas = res.data;
        const areaNum = [];
        const time = [];
        for (const benchArea of this.benchAreas) {
          areaNum.push(benchArea.area);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchArea.time, 'yyyy年MM月dd日');
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
            text: this.selectedRobot === undefined ? '叠合板总面积' : '',
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
              text: '叠合板面积（㎡）',
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
              '<td style="padding:0"><b>{point.y:.1f} ㎡</b></td></tr>',
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
            name: '叠合板面积',
            data: areaNum
          }]
        });
      });
  }
}
